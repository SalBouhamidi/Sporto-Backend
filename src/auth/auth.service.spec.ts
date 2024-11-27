import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import { Model } from 'mongoose';
import { RegisterDtos } from './DTOs/register-user.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import {ResponseUser} from "./DTOs/response-user.dto"

const mockResponseUser = {
  name: "Zyuu",
  email: "testingwithjest@gmail.com",
  organisationName: "eeeee",
};

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<User>;

  const mockUserModel = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Register', () => {
    it('should check if the user exists, if so it should send an error', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(mockResponseUser);
      const result = await authService.Register({
        name: "Zyuu",
        email: "testingwithjest@gmail.com",
        password: "jeUejeje778@@",
        organisationName: "eeeee",
      } as RegisterDtos);

      expect(result).toBe('email is already exixts try to login');
    });


    it('should successfully register a user', async () => {
      mockUserModel.findOne.mockResolvedValueOnce(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedpassword' as never);
      // jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(Promise.resolve('hashedpassword'));


      const mockSavedUser = { ...mockResponseUser, password: 'hashedpassword' };
      mockUserModel.save = jest.fn().mockResolvedValueOnce(mockSavedUser); 

      const result = await authService.Register({
        name: "Zyuu",
        email: "newuser@gmail.com",
        password: "strongpassword",
        organisationName: "eeeee",
      } as RegisterDtos);

      expect(result).toEqual(plainToInstance(ResponseUser, mockSavedUser));
    });

    it('should return an error message on exception', async () => {
      mockUserModel.findOne.mockRejectedValueOnce(new Error('Unexpected error'));

      const result = await authService.Register({
        name: "Zyuu",
        email: "newuser@gmail.com",
        password: "strongpassword",
        organisationName: "eeeee",
      } as RegisterDtos);

      expect(result).toBe("There's an error please try again");
    });
  });
});
