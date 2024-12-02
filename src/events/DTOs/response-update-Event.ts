import { Expose } from "class-transformer";
import { Types } from "mongoose";
import { User } from "src/users/user.schema";


export class responseupdateEventDtos{
    @Expose()
    name:string
    @Expose()
    date: Date
    @Expose()
    description:string
    @Expose()
    owner: User

}