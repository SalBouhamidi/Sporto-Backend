import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './event.schema'
import { Model } from 'mongoose';
import { createEventDtos } from "./DTOs/create-event.dto"
import { responseEventDtos } from "./DTOs/response-Event.dto"
import { plainToInstance } from 'class-transformer';
import { Types } from 'mongoose';
import { responseupdateEventDtos } from "./DTOs/response-update-Event"
import { response } from 'express';
@Injectable()
export class EventsService {
    constructor(@InjectModel(Event.name) private eventmodel: Model<EventDocument>) { }

    async CreateEvent(userId: string, createeventDtos: createEventDtos): Promise<responseEventDtos | string> {
        try {
            createeventDtos.owner = new Types.ObjectId(userId);
            let newEvent = new this.eventmodel(createeventDtos);
            const DateandTimetoday = new Date();
            let TodayDate = DateandTimetoday.toISOString().split('T')[0]
            let dateofEvent = new Date(createeventDtos.date).toISOString().split('T')[0];
            if (dateofEvent < TodayDate) {
                return "The date is invalid ";
            }
            const checkExistingEvent = await this.eventmodel.findOne({
                name: createeventDtos.name,
                date: createeventDtos.date,
                description: createeventDtos.description
            });
            if (checkExistingEvent) {
                return "An event with the same info and date already exists";
            }

            let groupCreate = newEvent.save();
            if (!groupCreate) {
                return "Ops smth bad happend Try again"
            }
            const respone: responseEventDtos = {
                name: createeventDtos.name,
                description: createeventDtos.description,
                date: createeventDtos.date,
                owner: createeventDtos.owner,
                participants: createeventDtos.participants
            }
            return respone;
        } catch (e) {
            console.log("an errror", e);
            return "smth bad happend please try again"
        }
    }

    async UpdateEvent(eventId: string, userId: string, updateEventDtos: createEventDtos): Promise<responseupdateEventDtos | string> {
        try {
            updateEventDtos.owner = new Types.ObjectId(userId);
            const DateandTimetoday = new Date();
            let TodayDate = DateandTimetoday.toISOString().split('T')[0];
            let dateofEvent = new Date(updateEventDtos.date).toISOString().split('T')[0];
            if (dateofEvent < TodayDate) {
                return "The date is invalid";
            }

            const existingEvent = await this.eventmodel.findById(eventId);
            if (!existingEvent) {
                return "The event does not exist";
            }

            if (existingEvent.owner.toString() !== updateEventDtos.owner.toString()) {
                return "You aren't authorized to delete this event"
            }
            const checkDuplicateEvent = await this.eventmodel.findOne({
                name: updateEventDtos.name,
                date: updateEventDtos.date,
                description: updateEventDtos.description,
            });

            if (checkDuplicateEvent) {
                return "An event with the same info already exists";
            }
            const updatedEvent = await this.eventmodel.findByIdAndUpdate(
                eventId,
                { $set: updateEventDtos },
                { new: true }
            );
            
            if (!updatedEvent) {
                return "Ops teh event does not update";
            }
            // console.log(typeof updatedEvent.date)
            const response: responseupdateEventDtos = {
                name: updatedEvent.name,
                description: updatedEvent.description,
                date: updatedEvent.date,
                owner: existingEvent.owner
            };

            return response;
        } catch (e) {
            console.error("an error", e);
            return "smth bad happened";
        }
    }


    async deleteEvent(eventId: string, userId: string): Promise<string> {
        try {
            const existingEvent = await this.eventmodel.findById(eventId);
            if (!existingEvent) {
                return "The event deos not existz";
            }
            if (existingEvent.owner.toString() !== userId) {
                return "You're not authorized to delete this event";
            }
            const deletedevent = await this.eventmodel.findByIdAndDelete(eventId);
            if (!deletedevent) {
                return "ops smth bad happend";
            }
            return "Event deleted successfully";
        } catch (e) {
            console.log(e);
            return "smth went wrong try again";
        }
    }

    async showEvent(eventId: string){
        try {
            let event = (await this.eventmodel.findById(eventId)).populate('participants');
            if (!event) {
                return "the event does not exist"
            }
            return event;
        } catch (e) {
            console.log(e)
            return "smth happend wrong try again"
        }

    }


    async getAllMyEvent(ownerId: string){
        try{
            let result = await this.eventmodel.find({owner: ownerId});
            if(!result){
                return "there's no events yet"
            }
            return result
        }catch(e){
            console.log(e);
            return "Ops something happend Wrong Kindly try again"
        }
    }



}
