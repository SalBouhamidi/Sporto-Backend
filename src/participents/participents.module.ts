import { Module } from '@nestjs/common';
import { ParticipentsController } from './participents.controller';
import { ParticipentsService } from './participents.service';
import { Participant, ParticipantSchema } from './participents.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Event,EventSchema } from 'src/events/event.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Participant.name, schema: ParticipantSchema}]), 
    MongooseModule.forFeature([{name:Event.name, schema: EventSchema}])
  ],
  controllers: [ParticipentsController],
  providers: [ParticipentsService]
})
export class ParticipentsModule {}
