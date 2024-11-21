import { Test, TestingModule } from '@nestjs/testing';
import { AxiosConfigService } from './axios-config.service';

describe('AxiosConfigService', () => {
  let service: AxiosConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AxiosConfigService],
    }).compile();

    service = module.get<AxiosConfigService>(AxiosConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
