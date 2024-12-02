import { Expose } from "class-transformer";
import { Types } from "mongoose";
import { Event } from "src/events/event.schema";


export class responseParticipant{
        @Expose()
        firstName: string
        @Expose()
        lastName:string
        @Expose()
        city: string
        @Expose()
        email:string
        @Expose()
        phoneNumber: string
        // @Expose()
        // events: Types.ObjectId
        @Expose()
        message: string
}