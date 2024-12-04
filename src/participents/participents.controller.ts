import { Controller, Param, Post, Req, Body, Put, Query,Delete, Get } from '@nestjs/common';
import {addParticipentDtos} from "./Dtos/create-Participant.dto"
import {validateJwt} from "../utils/validateJWT"
import { ParticipentsService } from './participents.service';
import {UpdateParticipantDtos} from "./Dtos/update-Participant.dto"

@Controller('participents')
export class ParticipentsController {
    constructor(private readonly participantService: ParticipentsService){}
    @Post(':eventId')
    async addParticipent(@Param('eventId')eventId : string , userId: string,@Body() createParticipantdtos: addParticipentDtos, @Req() req){
        try{
            let token = req.headers['authorization'];
            let theAuthentificator = validateJwt(token);
            if(!theAuthentificator){
                return "You can't add participants to that event"
            }
            userId = theAuthentificator.id;
            console.log('what we recieve',createParticipantdtos);
            return await this.participantService.addParticipent(createParticipantdtos,userId, eventId)
        }catch(e){
            console.log(e);
            return "Ops the participant wasns't added smth went wrong" 
        }
    }
    @Put(':eventId/:participantId')
    async updateParticipant(@Param('eventId') eventId:string,@Param('participantId') participantId:string , userId: string, @Body() updateParticipantdtos : UpdateParticipantDtos, @Req() req){
        try{
            let token = req.headers['authorization'];
            let isAuthentificator = validateJwt(token);
            if(!isAuthentificator){
                return "You can't update the participant, please login "
            }
            userId= isAuthentificator.id
            return await this.participantService.UpdateParticipant(updateParticipantdtos,userId,eventId, participantId )
        }catch(e){
            console.log(e);
            return "ops something went wrong in the update participant"
        }
    }

    @Delete(':eventId/:participantId')
    async removeParticipant(@Param('eventId') eventId:string,@Param('participantId') participantId:string , userId: string, @Req() req){
        try{
            let token = req.headers['authorization'];
            let isAuthentificator = validateJwt(token);
            if(!isAuthentificator){
                return "You can't update the participant, please login "
            }
            userId= isAuthentificator.id;
            console.log(isAuthentificator);
            return await this.participantService.deleteParticipent(eventId, participantId,userId)

        }catch(e){
            console.log(e);
            return "ops smth went wrong in the update participant"
        }
    }

    @Get(':eventId')
    async listParticipants(@Param('eventId') eventId:string, userId: string, @Req() req){
        try{
            let token = req.headers['authorization'];
            let isAuthentificator = validateJwt(token);
            if(!isAuthentificator){
                return "You can't update the participant, please login "
            }
            userId= isAuthentificator.id
            return await this.participantService.listOfParticipants(eventId, userId)

        }catch(e){
            console.log(e);
            return 'ops smth went wrong in list participant'
        }
    }

}
