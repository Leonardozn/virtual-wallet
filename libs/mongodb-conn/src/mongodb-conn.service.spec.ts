import { Test, TestingModule } from '@nestjs/testing';
import { MongodbConnService } from './mongodb-conn.service';

describe('MongodbConnService', () => {
  let service: MongodbConnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongodbConnService],
    }).compile();

    service = module.get<MongodbConnService>(MongodbConnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
