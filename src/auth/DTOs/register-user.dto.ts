import { IsString, IsEmail, IsStrongPassword, IsNotEmpty, IsOptional,MinLength, MaxLength, IsDefined} from "class-validator";

export class RegisterDtos{
@MinLength(2, {message:" The name must is too short"})
@MaxLength(30, {message: "The name is too long"})
@IsString({message: "the name must to be string"})
@IsNotEmpty({message: "the name must not be empty"})
name:string

@IsEmail({},{message: "it should be a valid format of email"})
@IsNotEmpty({message: "your email shouldn't be empty"})
email:string


@IsDefined({ message: 'Password must be defined' })
@IsNotEmpty({message: "password shouldn't be empty"})
@IsStrongPassword({},{message: "the password is not strong"})
password: string

@IsOptional()
@MinLength(2, {message:"The organisation name is super short"})
@MaxLength(10, {message:"The organisation name is too lolng"})
@IsString({message: "the name of the organisation must be string"})
organisationName:string

}