import {  IsEmail, IsStrongPassword, IsNotEmpty,IsDefined} from "class-validator";

export class LoginDtos{

@IsEmail({},{message: "it should be a valid format of email"})
@IsNotEmpty({message: "your email shouldn't be empty"})
email:string


@IsDefined({ message: 'Password must be defined' })
@IsNotEmpty({message: "password shouldn't be empty"})
@IsStrongPassword({},{message: "the password is not strong"})
password: string

}