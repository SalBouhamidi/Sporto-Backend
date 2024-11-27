import { Injectable } from '@nestjs/common';
import {User, UserDocument} from '../users/user.schema' 
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RegisterDtos } from './DTOs/register-user.dto';
import {ResponseUser} from "./DTOs/response-user.dto"
import { plainToInstance } from 'class-transformer';
import { BcyptingPassword } from '../utils/BcyptingPassword';


@Injectable()

export class AuthService {
    constructor(
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
}
