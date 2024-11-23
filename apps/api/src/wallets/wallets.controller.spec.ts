import { Test, TestingModule } from '@nestjs/testing';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { HandleResponseService } from '@app/handle-response';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ChargeWalletDto } from './dto/charge-wallet.dto';
import { PayWalletDto } from './dto/pay-wallet.dto';
import { ConfirmPaymentWalletDto } from './dto/confirm-payment.dto';

describe('WalletsController', () => {
  let controller: WalletsController;
  let walletsService: WalletsService;
  let handleResponseService: HandleResponseService;
  let mockOwnResponse: Partial<Response>;
  const mockedResponse = 'MOCKED_RESPONSE';
  const mockedHandleResponse = { statusCode: HttpStatus.OK, data: mockedResponse };

  beforeEach(async () => {
    const mockWalletsService = {
      create: jest.fn(() => mockedResponse),
      findAll: jest.fn(() => mockedResponse),
      findOne: jest.fn(() => mockedResponse),
      update: jest.fn(() => mockedResponse),
      charge: jest.fn(() => mockedResponse),
      pay: jest.fn(() => mockedResponse),
      confirmpayment: jest.fn(() => mockedResponse),
      remove: jest.fn(() => mockedResponse)
    };

    const mockHandleResponseService = {
      buildResponse: jest.fn((response) => {
        if (response === mockedResponse) return mockedHandleResponse;
      }),
    };

    mockOwnResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletsController],
      providers: [
        { provide: WalletsService, useValue: mockWalletsService },
        { provide: HandleResponseService, useValue: mockHandleResponseService },
      ],
    }).compile();

    controller = module.get<WalletsController>(WalletsController);
    walletsService = module.get<WalletsService>(WalletsService);
    handleResponseService = module.get<HandleResponseService>(HandleResponseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Create and handleResponse methods works!', async () => {
      const createWalletDto: CreateWalletDto = {
        client: '123456789',
        amount: 1
      };

      jest.spyOn(walletsService, 'create');
      jest.spyOn(handleResponseService, 'buildResponse');

      await controller.create(mockOwnResponse as Response, createWalletDto);
      
      expect(walletsService.create).toHaveBeenCalledWith(createWalletDto);
      expect(handleResponseService.buildResponse).toHaveBeenCalledWith(mockedResponse);
      expect(mockOwnResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockOwnResponse.json).toHaveBeenCalledWith(mockedHandleResponse);
    });
  });

  describe('findAll', () => {
    it('should return all wallets', async () => {
      jest.spyOn(walletsService, 'findAll')

      await controller.findAll(mockOwnResponse as Response);

      expect(walletsService.findAll).toHaveBeenCalled();
      expect(handleResponseService.buildResponse).toHaveBeenCalledWith(mockedResponse);
      expect(mockOwnResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockOwnResponse.json).toHaveBeenCalledWith(mockedHandleResponse);
    });
  });

  describe('findOne', () => {
    it('should return one wallet', async () => {
      jest.spyOn(walletsService, 'findOne')

      await controller.findOne(mockOwnResponse as Response, '1');

      expect(walletsService.findOne).toHaveBeenCalledWith('1');
      expect(handleResponseService.buildResponse).toHaveBeenCalledWith(mockedResponse);
      expect(mockOwnResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockOwnResponse.json).toHaveBeenCalledWith(mockedHandleResponse);
    });
  });

  describe('update', () => {
    it('should update a wallet', async () => {
      const updateWalletDto: UpdateWalletDto = { amount: 2 };
      jest.spyOn(walletsService, 'update')

      await controller.update(mockOwnResponse as Response, '1', updateWalletDto);

      expect(walletsService.update).toHaveBeenCalledWith('1', updateWalletDto);
      expect(handleResponseService.buildResponse).toHaveBeenCalledWith(mockedResponse);
      expect(mockOwnResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockOwnResponse.json).toHaveBeenCalledWith(mockedHandleResponse);
    });
  });

  describe('charge', () => {
    it('should update a wallet', async () => {
      const chargeWalletDto: ChargeWalletDto = { document: '123456789', phone: '3001234567', amount: 1 };
      const walletId = '1';

      jest.spyOn(walletsService, 'charge')

      await controller.charge(mockOwnResponse as Response, walletId, chargeWalletDto);

      expect(walletsService.charge).toHaveBeenCalledWith(walletId, chargeWalletDto);
      expect(handleResponseService.buildResponse).toHaveBeenCalledWith(mockedResponse);
      expect(mockOwnResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockOwnResponse.json).toHaveBeenCalledWith(mockedHandleResponse);
    });
  });

  describe('pay', () => {
    it('should create a new pending payment', async () => {
      const payWalletDto: PayWalletDto = { amount: 1 };
      const walletId ='1';

      jest.spyOn(walletsService, 'pay')

      await controller.pay(mockOwnResponse as Response, walletId, payWalletDto);

      expect(walletsService.pay).toHaveBeenCalledWith(walletId, payWalletDto);
      expect(handleResponseService.buildResponse).toHaveBeenCalledWith(mockedResponse);
      expect(mockOwnResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockOwnResponse.json).toHaveBeenCalledWith(mockedHandleResponse);
    });
  });

  describe('confirmpayment', () => {
    it('should update a payment and wallet', async () => {
      const confirmpaymentWalletDto: ConfirmPaymentWalletDto = { token: 'ABCDEF' };
      const paymentId ='1';
      const sessionId = '1';

      jest.spyOn(walletsService, 'confirmpayment')

      await controller.confirmpayment(mockOwnResponse as Response, paymentId, sessionId, confirmpaymentWalletDto);

      expect(walletsService.confirmpayment).toHaveBeenCalledWith(paymentId, sessionId, confirmpaymentWalletDto);
      expect(handleResponseService.buildResponse).toHaveBeenCalledWith(mockedResponse);
      expect(mockOwnResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockOwnResponse.json).toHaveBeenCalledWith(mockedHandleResponse);
    });
  });

  describe('remove', () => {
    it('should remove a wallet', async () => {
      jest.spyOn(walletsService, 'remove')

      await controller.remove(mockOwnResponse as Response, '1');

      expect(walletsService.remove).toHaveBeenCalledWith('1');
      expect(handleResponseService.buildResponse).toHaveBeenCalledWith(mockedResponse);
      expect(mockOwnResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockOwnResponse.json).toHaveBeenCalledWith(mockedHandleResponse);
    });
  });
});
