import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service'; 
import { Types } from 'mongoose';
import * as validateJWT from '../utils/validateJWT';

describe('EventsController', () => {
  let controller: EventsController;
  let mockEventsService: Partial<EventsService>;

  beforeEach(async () => {
    mockEventsService = {
      CreateEvent: jest.fn()
    };

    // Spy on validateJwt
    jest.spyOn(validateJWT, 'validateJwt').mockReturnValue({
      id: 'test-user-id'
    });

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: mockEventsService
        }
      ]
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  describe('CreateEvent', () => {
    it('should create a new event', async () => {
      // Prepare test data
      const createEventDto = {
        name: 'Test Event',
        description: 'Test Description',
        date: new Date(),
      };

      const mockRequest = {
        headers: {
          authorization: 'test-token'
        }
      };

      (mockEventsService.CreateEvent as jest.Mock).mockResolvedValue({
        ...createEventDto,
        userId: 'test-user-id'
      });
      const result = await controller.CreateEvent(createEventDto, mockRequest);
      expect(validateJWT.validateJwt).toHaveBeenCalledWith('test-token');
      expect(mockEventsService.CreateEvent).toHaveBeenCalledWith(
        'test-user-id',
        createEventDto
      );
      expect(result).toEqual({
        ...createEventDto,
        userId: 'test-user-id'
      });
    });

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});