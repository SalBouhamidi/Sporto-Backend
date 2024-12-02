import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Types } from "mongoose";

export class addParticipentDtos {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber("MA")
  phoneNumber: string;

  @IsOptional() 
  @IsMongoId({ each: true }) 
  events?: Types.ObjectId[];
}
