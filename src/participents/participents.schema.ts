import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { Document } from "mongodb";
import mongoose from "mongoose";


export type ParticipantDocument = Participant & Document;
@Schema()
export class Participant{
    @Prop({require: true})
    firstName:string

    @Prop({require: true})
    lastName: string

    @Prop({require: true})
    city:string

    @Prop({require: true})
    email:string

    @Prop({require: true})
    phoneNumber:string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }] })
    events: mongoose.Types.ObjectId[];;

}

export const ParticipantSchema = SchemaFactory.createForClass(Participant)