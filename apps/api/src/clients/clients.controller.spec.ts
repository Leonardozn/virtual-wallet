import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { HandleResponseService } from '@app/handle-response';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

describe('ClientsController', () => {
  let controller: ClientsController;
  let clientsService: ClientsService;
  let handleResponseService: HandleResponseService;
  let mockOwnResponse: Partial<Response>;
  const mockedResponse = 'MOCKED_RESPONSE';
  const mockedHandleResponse = { statusCode: HttpStatus.OK, data: mockedResponse };

  beforeEach(async () => {
    const mockClientsService = {
      create: jest.fn(() => mockedResponse),
      findAll: jest.fn(() => mockedResponse),
      findOne: jest.fn(() => mockedResponse),
      update: jest.fn(() => mockedResponse),
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
      controllers: [ClientsController],
      providers: [
        { provide: ClientsService, useValue: mockClientsService },
        { provide: HandleResponseService, useValue: mockHandleResponseService },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    clientsService = module.get<ClientsService>(ClientsService);
    handleResponseService = module.get<HandleResponseService>(HandleResponseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Create and handleResponse methods works!', async () => {
      const createClientDto: CreateClientDto = {
        document: '123456789',
        name: 'Test Client',
        email: 'email@domain.com',
        phone: '3001234567',
      };

      jest.spyOn(clientsService, 'create');
      jest.spyOn(handleResponseService, 'buildResponse');

      await controller.create(mockOwnResponse as Response, createClientDto);
      
      expect(clientsService.create).toHaveBeenCalledWith(createClientDto);
      expect(handleResponseService.buildResponse).toHaveBeenCalledWith(mockedResponse);
      expect(mockOwnResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockOwnResponse.json).toHaveBeenCalledWith(mockedHandleResponse);
    });
  });

  describe('findAll', () => {
    it('should return all clients', async () => {
      jest.spyOn(clientsService, 'findAll')

      await controller.findAll(mockOwnResponse as Response);

      expect(clientsService.findAll).toHaveBeenCalled();
      expect(handleResponseService.buildResponse).toHaveBeenCalledWith(mockedResponse);
      expect(mockOwnResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockOwnResponse.json).toHaveBeenCalledWith(mockedHandleResponse);
    });
  });

  describe('findOne', () => {
    it('should return one client', async () => {
      jest.spyOn(clientsService, 'findOne')

      await controller.findOne(mockOwnResponse as Response, '1');

      expect(clientsService.findOne).toHaveBeenCalledWith('1');
      expect(handleResponseService.buildResponse).toHaveBeenCalledWith(mockedResponse);
      expect(mockOwnResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockOwnResponse.json).toHaveBeenCalledWith(mockedHandleResponse);
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const updateClientDto: UpdateClientDto = { name: 'Updated Client' };
      jest.spyOn(clientsService, 'update')

      await controller.update(mockOwnResponse as Response, '1', updateClientDto);

      expect(clientsService.update).toHaveBeenCalledWith('1', updateClientDto);
      expect(handleResponseService.buildResponse).toHaveBeenCalledWith(mockedResponse);
      expect(mockOwnResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockOwnResponse.json).toHaveBeenCalledWith(mockedHandleResponse);
    });
  });

  describe('remove', () => {
    it('should remove a client', async () => {
      jest.spyOn(clientsService, 'remove')

      await controller.remove(mockOwnResponse as Response, '1');

      expect(clientsService.remove).toHaveBeenCalledWith('1');
      expect(handleResponseService.buildResponse).toHaveBeenCalledWith(mockedResponse);
      expect(mockOwnResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockOwnResponse.json).toHaveBeenCalledWith(mockedHandleResponse);
    });
  });
});
