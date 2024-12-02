import { Body, Controller, Post, Req, Get } from '@nestjs/common';
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
  @Get()
  async VerifyToken(@Req() req){
    try{
      let token = req.headers['authorization'].split(" ")[1];
    // console.log("here's my token : ",token)
    return await this.authService.verifyToken(token);
    }catch(e){
      console.log(e);
    }

  }
  }

