import { Test, TestingModule } from '@nestjs/testing';
import { HandleResponseService } from './handle-response.service';

describe('HandleResponseService', () => {
  let service: HandleResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HandleResponseService],
    }).compile();

    service = module.get<HandleResponseService>(HandleResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
