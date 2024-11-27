import { Controller,Body, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {UsersService} from "./users.service"

@Controller()
export class UsersController {
    constructor(private readonly UsersService:UsersService){}


}
