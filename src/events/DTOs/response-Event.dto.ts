import { Expose } from "class-transformer";
import { Types } from "mongoose";


export class responseEventDtos{
    @Expose()
    name:string
    @Expose()
    description:string
    @Expose()
    owner: Types.ObjectId
    @Expose()
    date: Date
    @Expose()
    participants?: Types.ObjectId[]

}