import { IsString, IsEmail, IsStrongPassword, IsNotEmpty, isString, isNotEmpty} from "class-validator";

export class CreateUserDtos{
@IsString()
@IsNotEmpty({message: "the name must not be empty"})
name:string

@IsEmail()
@IsNotEmpty({message: "your email shouldn't be empty"})
email:string

@IsNotEmpty({message: "password shouldn't be empty"})
@IsStrongPassword()
password: string

}