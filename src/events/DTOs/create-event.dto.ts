import { IsArray, IsDate, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { Types } from 'mongoose';



export class createEventDtos{
@IsDefined({message:"teh name of the Event must be definded"})
@IsNotEmpty({message:"The name must is required"})
@IsString({message: "the name must be string"}) 
name:string

@IsNotEmpty({message:"the description is required"})
@IsString({message:"The Description must be a text"})
description:string

@IsOptional()
@IsMongoId()
owner?:Types.ObjectId

@IsNotEmpty({message: "the date of even must be present"})
@IsDate({message:"the date should be format of date"})
@Type(() => Date)

date: Date

@IsOptional()
@IsArray()
@IsMongoId({ each: true })
participants?: Types.ObjectId[];
}