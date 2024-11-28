import { Controller, Post, Get, Put, Delete, Body, Param, Req } from '@nestjs/common';
import { EventsService } from "./events.service"
import { createEventDtos } from './DTOs/create-event.dto';
import { Types } from 'mongoose';
import { validateJwt } from "../utils/validateJWT"

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Post('/create')
    async CreateEvent(@Body() createEventDtos: createEventDtos, @Req() req) {
        let token = req.headers['authorization'];
        let isOwner = validateJwt(token);
        const userId = isOwner.id;
        // console.log(userId);
        return await this.eventsService.CreateEvent(userId, createEventDtos);
    }

    @Put('/:idevent')
    async updadateEvent(@Param('idevent') idevent: string, @Req() req: any, @Body() updateEventDtos: createEventDtos) {
        try {
            let token = req.headers['authorization'];
            let isOwner = validateJwt(token);
            const userId = isOwner.id;
            return await this.eventsService.UpdateEvent(idevent, userId, updateEventDtos);
        } catch (e) {
            console.log('error in updating', e)
            return "Ops there was an error try later"
        }

    }

    @Delete('/:idevent')
    async deleteEvent(@Param('idevent') idevent: string, @Req() req: any) {
        try{
            let token = req.headers['authorization'];
            let isOwner = validateJwt(token);
            console.log(isOwner);
            if(!isOwner){
                return "You aen't logged in"
            }
            const userId = isOwner.id;
            if (!isOwner) {
                return "you aren't authorized todelete "
            }
            return await this.eventsService.deleteEvent(idevent, userId)
        }catch(e){
            console.log(e);
            return "Ops smth bad happend"
        }
    }

    @Get('/:idevent')
    async showEvent(@Param('idevent') idevent: string) {
        try {
            return await this.eventsService.showEvent(idevent)
        } catch (e) {
            console.log(e)
            return "ops smth is wrong"
        }
    }




}
