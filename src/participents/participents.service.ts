import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Participant, ParticipantDocument } from './participents.schema';
import { Model } from 'mongoose';
import { addParticipentDtos } from "./Dtos/create-Participant.dto"
import { Event, EventDocument } from 'src/events/event.schema';
import { responseParticipant } from "./Dtos/response-Participant.dto"
import { UpdateParticipantDtos } from "./Dtos/update-Participant.dto"
import { Types } from 'mongoose';
export interface EventParticipantsList {
    eventName: string;
    eventDate: Date;
    participants: ParticipantData[];
}
interface ParticipantData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
  }

@Injectable()

export class ParticipentsService {
    constructor(
        @InjectModel(Participant.name) private participantModel: Model<ParticipantDocument>,
        @InjectModel(Event.name) private eventModel: Model<EventDocument>) { }

    async addParticipent(addNewParticipantDtos: addParticipentDtos, userId, eventId): Promise<responseParticipant | string> {
        try {
            let existingEvent = await this.eventModel.findById(eventId);
            if (!existingEvent) {
                return "Ops the Event not found Please Try later"
            }
            if (existingEvent.owner.toString() !== userId) {
                return "you aren't authorized to do this action"
            }
            const checkingUserExistence = await this.participantModel.findOne({
                firstName: addNewParticipantDtos.firstName,
                lastName: addNewParticipantDtos.lastName
            })
            if(checkingUserExistence){
                return "the user is already exist"
            }
            let newParticpant = new this.participantModel(addNewParticipantDtos);
            if (!newParticpant.events) {
                newParticpant.events = [];
            }
            newParticpant.events.push(eventId);
            let registeredParticipant = await newParticpant.save();
            if (!registeredParticipant) {
                return "Ops smth wrong happend"
            }

            existingEvent.participants.push(registeredParticipant._id);
            await existingEvent.save();

            let results: responseParticipant = {
                firstName: addNewParticipantDtos.firstName,
                lastName: addNewParticipantDtos.lastName,
                city: addNewParticipantDtos.city,
                email: addNewParticipantDtos.city,
                phoneNumber: addNewParticipantDtos.phoneNumber,
                message: "The participant was added successfully"
            }
            return results
        } catch (e) {
            console.log('Theres an error', e)
            return "Ops smth bad happend Kindly try again !"
        }
    }

    async UpdateParticipant(updateParticipantdtos: UpdateParticipantDtos, userId, eventId, participantId): Promise<responseParticipant | string> {
        try {

            let existingEvent = await this.eventModel.findById(eventId)
            if (existingEvent.owner.toString() !== userId) {
                return "you aren't allowed to update that user"
            }
            if (!existingEvent) {
                return "what event are you talking about"
            }
            let existParticipant = await this.participantModel.findById(participantId);
            if (!existParticipant) {
                return "the participant does not exist"
            }

            const checkDuplicatedParticipant = await this.participantModel.findOne({
                firstName: updateParticipantdtos.firstName,
                lastName: updateParticipantdtos.lastName,
                email: updateParticipantdtos.email,
                phoneNumber: updateParticipantdtos.phoneNumber,
            })
            if (checkDuplicatedParticipant) {
                return "A participant with the same info is already exist"
            }
            const updateParticipant = await this.participantModel.findByIdAndUpdate(
                participantId,
                { $set: updateParticipantdtos },
                { new: true }
            )
            if (!updateParticipant) {
                return "ops the participant doesn't update"
            }
            const result: responseParticipant = {
                firstName: updateParticipant.firstName,
                lastName: updateParticipant.lastName,
                email: updateParticipant.email,
                phoneNumber: updateParticipant.phoneNumber,
                city: updateParticipant.city,
                message: "the participant was updated successfully"
            }

            return result;
        } catch (e) {
            console.log(e);

        }
    }

    async deleteParticipent(eventId, participantid, userId): Promise<string> {
        try {
            const existingEvent = await this.eventModel.findById(eventId);
            console.log(existingEvent);
            if (!existingEvent) {
                return "the Event does not exist"
            }
            if (existingEvent.owner.toString() !== userId) {
                return "You're not authorized to delete the partcipant"
            }

            let participantindex = existingEvent.participants.indexOf(participantid);

            if (participantindex === -1) {
                return "participant not found in this event";
            }
            existingEvent.participants.splice(participantindex, 1);
            let deletedParticipant = await existingEvent.save();
            const ExistingEventInparticipant = await this.participantModel.findById(participantid);
            if(!ExistingEventInparticipant){
                return "The event is not found on the participants event"
            }
            let eventindex = ExistingEventInparticipant.events.indexOf(eventId);
            // console.log("index of event", eventindex)
            if(eventindex === -1){
                return "Event does not exist in the participant Events"
            }
            ExistingEventInparticipant.events.splice(eventindex, 1);
            let deleteEventFromParticipant = await ExistingEventInparticipant.save();
            // console.log('delete event from participant', deleteEventFromParticipant)
            if(deletedParticipant && deleteEventFromParticipant){
                return "the participant was deleted successfully "
            }
        }catch(e){
            console.log(e);
            return "smth bad happend"
        }
            
        }


        async listOfParticipants(eventId:string, userId: string):Promise <EventParticipantsList | string>{
            try{
                let event = await this.eventModel.findById(eventId).populate('participants', 'firstName lastName email phoneNumber city').exec();
                if (!event) {
                    return "the event does not exist";
                  }
                  return {
                    eventName: event.name,
                    eventDate: event.date,
                    participants: event.participants.map((participant: any) => ({
                      firstName: participant.firstName,
                      lastName: participant.lastName,
                      email: participant.email,
                      phoneNumber: participant.phoneNumber,
                      city: participant.city,
                    })),
                  };

            }catch(e){
                console.log(e);
                return 'ops smth went wrong'
            }
        }



}
