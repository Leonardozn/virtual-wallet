import { Test, TestingModule } from '@nestjs/testing';
import { WalletsService } from './wallets.service';
import { AxiosConfigService } from '@app/axios-config';
import { XmlToJsonService } from '@app/xml-to-json';
import * as js2xmlparser from 'js2xmlparser';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ChargeWalletDto } from './dto/charge-wallet.dto';
import { PayWalletDto } from './dto/pay-wallet.dto';
import { ConfirmPaymentWalletDto } from './dto/confirm-payment.dto';

jest.mock('@app/xml-to-json');

describe('WalletsService', () => {
  let service: WalletsService;
  let axiosConfigService: jest.Mocked<AxiosConfigService>;
  const mockedBody = '<wallets><name>Test Wallet</name></wallets>';
  const mockedAxiosResponse = { data: '<response><message>success</message></response>' };
  const mockedXmlToJsonService = { response: { message: 'success' } };

  jest.spyOn(js2xmlparser, 'parse').mockReturnValue(mockedBody);

  jest.spyOn(AxiosConfigService, 'getInstance').mockReturnValue({
    getVirtualWalletConfig: jest.fn(() => ({
      get: jest.fn(() => mockedAxiosResponse),
      post: jest.fn(() => mockedAxiosResponse),
      patch: jest.fn(() => mockedAxiosResponse),
      put: jest.fn(() => mockedAxiosResponse),
      delete: jest.fn(() => mockedAxiosResponse)
    })),
  } as any);

  jest.spyOn(XmlToJsonService, 'parse').mockReturnValue(mockedXmlToJsonService as any);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletsService,
        AxiosConfigService,
        XmlToJsonService,
      ],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
    axiosConfigService = module.get<AxiosConfigService>(AxiosConfigService) as jest.Mocked<AxiosConfigService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new wallet', async () => {
      const createWalletDto: CreateWalletDto = {
        client: '123456789',
        amount: 1
      };

      XmlToJsonService.parse(mockedAxiosResponse.data);

      const result = await service.create(createWalletDto);
      
      expect(js2xmlparser.parse).toHaveBeenCalledWith('wallets', createWalletDto);
      expect(XmlToJsonService.parse).toHaveBeenCalledWith(mockedAxiosResponse.data);
      expect(result).toBe(mockedXmlToJsonService.response);
    });
  });

  describe('findAll', () => {
    it('should return all wallets', async () => {
      XmlToJsonService.parse(mockedAxiosResponse.data);

      const result = await service.findAll();
      
      expect(XmlToJsonService.parse).toHaveBeenCalledWith(mockedAxiosResponse.data);
      expect(result).toBe(mockedXmlToJsonService.response);
    });
  });

  describe('findOne', () => {
    it('should return a single wallet', async () => {
      XmlToJsonService.parse(mockedAxiosResponse.data);

      const result = await service.findOne('1');
      
      expect(XmlToJsonService.parse).toHaveBeenCalledWith(mockedAxiosResponse.data);
      expect(result).toBe(mockedXmlToJsonService.response);
    });
  });

  describe('update', () => {
    it('should update a wallet', async () => {
      const updateWalletDto: UpdateWalletDto = { client: '123456789', amount: 1 };
      const walletId = '1';
      
      XmlToJsonService.parse(mockedAxiosResponse.data);

      const result = await service.update(walletId, updateWalletDto);
      
      expect(js2xmlparser.parse).toHaveBeenCalledWith('wallets', updateWalletDto);
      expect(XmlToJsonService.parse).toHaveBeenCalledWith(mockedAxiosResponse.data);
      expect(result).toBe(mockedXmlToJsonService.response);
    });
  });

  describe('charge', () => {
    it('should charge a wallet', async () => {
      const chargeWalletDto: ChargeWalletDto = { document: '123456789', phone: '3001234567', amount: 1 };
      const walletId = '1';
      
      XmlToJsonService.parse(mockedAxiosResponse.data);

      const result = await service.charge(walletId, chargeWalletDto);
      
      expect(js2xmlparser.parse).toHaveBeenCalledWith('wallets', chargeWalletDto);
      expect(XmlToJsonService.parse).toHaveBeenCalledWith(mockedAxiosResponse.data);
      expect(result).toBe(mockedXmlToJsonService.response);
    });
  });

  describe('pay', () => {
    it('should create a new pending payment', async () => {
      const payWalletDto: PayWalletDto = { amount: 1 };
      const walletId = '1';
      
      XmlToJsonService.parse(mockedAxiosResponse.data);

      const result = await service.pay(walletId, payWalletDto);
      
      expect(js2xmlparser.parse).toHaveBeenCalledWith('wallets', payWalletDto);
      expect(XmlToJsonService.parse).toHaveBeenCalledWith(mockedAxiosResponse.data);
      expect(result).toBe(mockedXmlToJsonService.response);
    });
  });

  describe('consirmpayment', () => {
    it('should update a payment and a wallet', async () => {
      const confirmpaymentWalletDto: ConfirmPaymentWalletDto = { token: 'ABCDEF' };
      const paymentId ='1';
      const sessionId = '1';
      
      XmlToJsonService.parse(mockedAxiosResponse.data);

      const result = await service.confirmpayment(paymentId, sessionId, confirmpaymentWalletDto);
      
      expect(js2xmlparser.parse).toHaveBeenCalledWith('wallets', confirmpaymentWalletDto);
      expect(XmlToJsonService.parse).toHaveBeenCalledWith(mockedAxiosResponse.data);
      expect(result).toBe(mockedXmlToJsonService.response);
    });
  });

  describe('remove', () => {
    it('should delete a wallet', async () => {
      XmlToJsonService.parse(mockedAxiosResponse.data);

      const result = await service.remove('1');
      
      expect(XmlToJsonService.parse).toHaveBeenCalledWith(mockedAxiosResponse.data);
      expect(result).toBe(mockedXmlToJsonService.response);
    });
  });
});
