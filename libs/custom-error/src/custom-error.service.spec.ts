import { Test, TestingModule } from '@nestjs/testing';
import { CustomErrorService } from './custom-error.service';

describe('CustomErrorService', () => {
  let service: CustomErrorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomErrorService],
    }).compile();

    service = module.get<CustomErrorService>(CustomErrorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
