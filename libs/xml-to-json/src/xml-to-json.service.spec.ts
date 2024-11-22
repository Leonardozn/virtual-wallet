import { Test, TestingModule } from '@nestjs/testing';
import { XmlToJsonService } from './xml-to-json.service';

describe('XmlToJsonService', () => {
  let service: XmlToJsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XmlToJsonService],
    }).compile();

    service = module.get<XmlToJsonService>(XmlToJsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
