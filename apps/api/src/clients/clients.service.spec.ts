import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { AxiosConfigService } from '@app/axios-config';
import { XmlToJsonService } from '@app/xml-to-json';
import * as js2xmlparser from 'js2xmlparser';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

jest.mock('@app/xml-to-json');

describe('ClientsService', () => {
  let service: ClientsService;
  let axiosConfigService: jest.Mocked<AxiosConfigService>;
  const mockedBody = '<clients><name>Test Client</name></clients>';
  const mockedAxiosResponse = { data: '<response><message>success</message></response>' };
  const mockedXmlToJsonService = { response: { message: 'success' } };

  jest.spyOn(js2xmlparser, 'parse').mockReturnValue(mockedBody);

  jest.spyOn(AxiosConfigService, 'getInstance').mockReturnValue({
    getVirtualWalletConfig: jest.fn(() => ({
      get: jest.fn(() => mockedAxiosResponse),
      post: jest.fn(() => mockedAxiosResponse),
      patch: jest.fn(() => mockedAxiosResponse),
      delete: jest.fn(() => mockedAxiosResponse)
    })),
  } as any);

  jest.spyOn(XmlToJsonService, 'parse').mockReturnValue(mockedXmlToJsonService as any);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        AxiosConfigService,
        XmlToJsonService,
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    axiosConfigService = module.get<AxiosConfigService>(AxiosConfigService) as jest.Mocked<AxiosConfigService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const createClientDto: CreateClientDto = {
        document: '123456789',
        name: 'Test Client',
        email: 'email@domain.com',
        phone: '3001234567',
      };

      // const axiosConfigInstance = AxiosConfigService.getInstance();

      XmlToJsonService.parse(mockedAxiosResponse.data);

      const result = await service.create(createClientDto);
      
      expect(js2xmlparser.parse).toHaveBeenCalledWith('clients', createClientDto);
      // expect(axiosConfigInstance.getVirtualWalletConfig().post).toHaveBeenCalledWith('/clients', mockedBody);
      expect(XmlToJsonService.parse).toHaveBeenCalledWith(mockedAxiosResponse.data);
      expect(result).toBe(mockedXmlToJsonService.response);
    });
  });

  describe('findAll', () => {
    it('should return all clients', async () => {
      XmlToJsonService.parse(mockedAxiosResponse.data);

      const result = await service.findAll();
      
      expect(XmlToJsonService.parse).toHaveBeenCalledWith(mockedAxiosResponse.data);
      expect(result).toBe(mockedXmlToJsonService.response);
    });
  });

  describe('findOne', () => {
    it('should return a single client', async () => {
      XmlToJsonService.parse(mockedAxiosResponse.data);

      const result = await service.findOne('1');
      
      expect(XmlToJsonService.parse).toHaveBeenCalledWith(mockedAxiosResponse.data);
      expect(result).toBe(mockedXmlToJsonService.response);
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const updateClientDto: UpdateClientDto = { name: 'Updated Client' };
      
      XmlToJsonService.parse(mockedAxiosResponse.data);

      const result = await service.update('1', updateClientDto);
      
      expect(js2xmlparser.parse).toHaveBeenCalledWith('clients', updateClientDto);
      expect(XmlToJsonService.parse).toHaveBeenCalledWith(mockedAxiosResponse.data);
      expect(result).toBe(mockedXmlToJsonService.response);
    });
  });

  describe('remove', () => {
    it('should delete a client', async () => {
      XmlToJsonService.parse(mockedAxiosResponse.data);

      const result = await service.remove('1');
      
      expect(XmlToJsonService.parse).toHaveBeenCalledWith(mockedAxiosResponse.data);
      expect(result).toBe(mockedXmlToJsonService.response);
    });
  });
});
