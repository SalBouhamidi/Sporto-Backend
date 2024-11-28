import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongodb";
import { User } from "src/users/user.schema";
import * as mongoose from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: User

    @Prop({required: true, maxlength:30})
    name: string;

    @Prop({required: true, minlength:7})
    description: string;

    @Prop({required:true, type: Date})
    date: Date;

    @Prop({type: [{type : mongoose.Schema.Types.ObjectId, ref:'User'}]})
    participants: User[];
}
export const EventSchema = SchemaFactory.createForClass(Event)