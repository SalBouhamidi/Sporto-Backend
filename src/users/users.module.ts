import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Users } from './users';

@Module({
  controllers: [UsersController],
  providers: [Users]
})
export class UsersModule {}
