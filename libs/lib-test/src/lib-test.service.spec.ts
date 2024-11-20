import { Test, TestingModule } from '@nestjs/testing';
import { LibTestService } from './lib-test.service';

describe('LibTestService', () => {
  let service: LibTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibTestService],
    }).compile();

    service = module.get<LibTestService>(LibTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
