import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {RegisterDtos} from "./DTOs/register-user.dto";
import {LoginDtos} from "./DTOs/login-user.dto"

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async Register(@Body() createUserDtos: RegisterDtos){
    return await this.authService.Register(createUserDtos);
  }
  @Post('/login')
  async Login(@Body() logindtos: LoginDtos){
    return await this.authService.Login(logindtos)
  }
  }

