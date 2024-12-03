import { Test, TestingModule } from '@nestjs/testing';
import { ParticipentsController } from './participents.controller';

describe('ParticipentsController', () => {
  let controller: ParticipentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipentsController],
    }).compile();

    controller = module.get<ParticipentsController>(ParticipentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
