import { Controller,Body, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {CreateUserDtos} from "src/users/DTOs/create-user.dto"
import {UsersService} from "./users.service"

@Controller()
export class UsersController {
    constructor(private readonly UsersService:UsersService){
    }

    @Post('/register')
    // @UsePipes(new ValidationPipe())
    Register(@Body() addUserDtos:CreateUserDtos){
        this.UsersService.create(addUserDtos)
    }
}
