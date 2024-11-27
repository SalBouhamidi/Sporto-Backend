import { Injectable } from '@nestjs/common';
import {User, UserDocument} from '../users/user.schema' 
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RegisterDtos } from './DTOs/register-user.dto';
import {ResponseUser} from "./DTOs/response-user.dto"
import { plainToInstance } from 'class-transformer';
import { BcyptingPassword } from '../utils/BcyptingPassword';
import {LoginDtos} from "./DTOs/login-user.dto"
import { CheckPassword } from '../utils/CheckPassword';
import { JwtService } from '@nestjs/jwt';
import {ResponseLoginUser} from "./DTOs/response-login-user.dto"

@Injectable()

export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,

    ){}
    async Register(registerDtos: RegisterDtos): Promise<ResponseUser | string > {
        try{
            let isuserExist = await this.userModel.findOne({email: registerDtos.email})
            if(isuserExist){
                return 'email is already exixts try to login'
            }else{
                let hashedpassword = await BcyptingPassword(registerDtos.password);
                if(!hashedpassword){
                    return "Verify your password and try again"
                }
                registerDtos.password = hashedpassword;
                let registerUser = new this.userModel(registerDtos);
                let userRegisterd = await registerUser.save();
                return plainToInstance(ResponseUser,userRegisterd)
            }
        }catch(e){
            console.log('a problem is catched', e);
            return "There's an error please try again"
        }
    }
    async Login(loginDtos: LoginDtos):Promise<ResponseLoginUser | string>{
        try{
            let checkUser = await this.userModel.findOne({email: loginDtos.email});
            if(!checkUser){
                return "The email or password is incorrect if you don't have an account please register"
            }
            let checkingthePassword = await CheckPassword(loginDtos.password, checkUser.password);
            if(!checkingthePassword){
                return "your email or password are not valid"
            }
            const payload = {
                id: checkUser.id,
                name:checkUser.name,
                email:checkUser.email
            }
            let token = await this.tokenGenrator(payload)
            return {
                id: checkUser.id,
                name: checkUser.name,
                email: checkUser.email,
                token,
                message: "your have logged in successfully"
            }

        }catch(e){
            return "Ops smth Bad happend"
        }
    }
    async tokenGenrator(payload): Promise<string>{
        const secret = process.env.JWT_SECRET;
        const expiresIn="1d"
        let secretKey = `${secret}${payload.id}`
        let token = await this.jwtService.signAsync(payload, { secret: secretKey, expiresIn });
        return token
    } 
}
