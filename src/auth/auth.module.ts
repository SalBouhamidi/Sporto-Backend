import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from "../users/user.schema"
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [
    MongooseModule.forFeature([
        {name: User.name, schema:UserSchema}
    ]),
    // UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
