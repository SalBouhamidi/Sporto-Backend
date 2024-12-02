import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, maxlength:50 })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({required:true, minlength: 8})
  password: string;

  @Prop({ required: false, maxlength: 100 })
  organizationName?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
