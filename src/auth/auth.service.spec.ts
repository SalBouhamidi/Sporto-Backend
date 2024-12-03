import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserModel;
  let mockJwtService;

  beforeEach(async () => {
    class UserModel {
      constructor(private data) {}
      save = jest.fn().mockResolvedValue(this.data);
      static create = jest.fn();
      static findOne = jest.fn();
    }
    jest.mock('bcrypt', () => ({
      hash: jest.fn(),
      compare: jest.fn()
    }));

    mockUserModel = UserModel;
    
    mockJwtService = {
      sign: jest.fn().mockReturnValue('test-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Register', () => {
    it('should register a new user', async () => {
      const registerDto = {
        name: 'Test User',
        email: 'test@test.com',
        password: 'password123',
        organisationName: 'test',
      };
      mockUserModel.findOne = jest.fn().mockResolvedValue(null);
  
      jest.mock('bcrypt', () => ({
        hash: jest.fn().mockResolvedValue('hashedPassword'),
        compare: jest.fn()
      }));  

      const mockUserInstance = new mockUserModel(registerDto);
      mockUserInstance.save = jest.fn().mockResolvedValue({
        ...registerDto,
        password: 'hashedPassword',
      });

      const userModelSpy = jest.spyOn(mockUserInstance, 'save');
      userModelSpy.mockResolvedValue(mockUserInstance);
  
      mockUserModel.prototype.save = jest.fn().mockResolvedValue(mockUserInstance);
  
      const result = await service.Register(registerDto);
  
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: registerDto.email });
      expect(result).toEqual({
        name: registerDto.name,
        email: registerDto.email,
        organisationName: registerDto.organisationName,
      });
    });
  });
})


