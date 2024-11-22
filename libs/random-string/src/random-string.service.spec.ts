import { Test, TestingModule } from '@nestjs/testing';
import { RandomStringService } from './random-string.service';

describe('RandomStringService', () => {
  let service: RandomStringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomStringService],
    }).compile();

    service = module.get<RandomStringService>(RandomStringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
