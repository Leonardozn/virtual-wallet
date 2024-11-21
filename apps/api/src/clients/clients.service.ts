import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AxiosConfigService } from '@app/axios-config';
import axios, { AxiosInstance } from 'axios'

@Injectable()
export class ClientsService {
  private axiosService: AxiosConfigService;

  constructor() {
    this.axiosService = AxiosConfigService.getInstance();
  }

  async create(createClientDto: CreateClientDto) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      const { data } = await httpService.post('/clients', createClientDto);
  
      return data;
    } catch (error) {
      console.error(error.response);
      return error.response.data;
    }
  }

  async findAll() {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      const { data } = await httpService.get('/clients');
  
      return data;
    } catch (error) {
      console.error(error.response);
      return error.response.data;
    }
  }

  async findOne(id: string) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      const { data } = await httpService.get(`/clients/${id}`);
  
      return data;
    } catch (error) {
      console.error(error.response);
      return error.response.data;
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      const { data } = await httpService.patch(`/clients/${id}`, updateClientDto);
  
      return data;
    } catch (error) {
      console.error(error.response);
      return error.response.data;
    }
  }

  async remove(id: string) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      const { data } = await httpService.delete(`/clients/${id}`);
  
      return data;
    } catch (error) {
      console.error(error.response);
      return error.response.data;
    }
  }
}
