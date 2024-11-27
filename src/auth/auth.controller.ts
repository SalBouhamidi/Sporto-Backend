import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {RegisterDtos} from "./DTOs/register-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async Register(@Body() createUserDtos: RegisterDtos){
    return await this.authService.Register(createUserDtos);
  }



  }

