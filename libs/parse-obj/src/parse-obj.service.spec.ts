import { Test, TestingModule } from '@nestjs/testing';
import { ParseObjService } from './parse-obj.service';

describe('ParseObjService', () => {
  let service: ParseObjService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParseObjService],
    }).compile();

    service = module.get<ParseObjService>(ParseObjService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
