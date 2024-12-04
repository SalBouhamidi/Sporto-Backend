import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService;

  beforeEach(async () => {
    mockAuthService = {
      Register: jest.fn(),
      Login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test-token'),
          },
        },
        {
          provide: getModelToken('User'),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getModelToken('User'),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto = {
        name: 'Test User',
        email: 'test@test.com',
        password: 'password123', 
        organisationName: 'test',
      };

      mockAuthService.Register.mockResolvedValue('User created');

      const result = await controller.Register(registerDto);
      console.log('µµµµµµµµµµµµµµ',result);
      expect(mockAuthService.Register).toHaveBeenCalledWith(registerDto);
      expect(result).toBe('User created');
    });
  });
  
  describe('login', () => {
    it('should login a user', async () => {
      const loginDto = {
        email: 'test@test.com',
        password: 'password123',
      };

      const expectedResponse = {
        access_token: 'test-token',
      };

      mockAuthService.Login.mockResolvedValue(expectedResponse);

      const result = await controller.Login(loginDto);
      const expectedUser = {
        name: 'Test User',
        email: 'test@test.com',
        organisationName: 'test',
        token: "test-token"
      };

      expect(mockAuthService.Login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(expectedResponse);
    });
  });

});
