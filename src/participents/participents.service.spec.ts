import { Test, TestingModule } from '@nestjs/testing';
import { ParticipentsService } from './participents.service';

describe('ParticipentsService', () => {
  let service: ParticipentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipentsService],
    }).compile();

    service = module.get<ParticipentsService>(ParticipentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
