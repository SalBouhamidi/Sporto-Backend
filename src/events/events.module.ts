import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './event.schema';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';


@Module({
    imports: [ MongooseModule.forFeature([{ name: Event.name, schema: EventSchema}])],
    controllers:[EventsController],
    providers: [EventsService],

})
export class EventsModule {}
