import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AxiosConfigService } from '@app/axios-config';
import * as js2xmlparser from 'js2xmlparser';
import { XmlToJsonService } from '@app/xml-to-json';

@Injectable()
export class ClientsService {
  constructor(
    private axiosService: AxiosConfigService
  ) {
    this.axiosService = AxiosConfigService.getInstance();
  }

  async create(createClientDto: CreateClientDto) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      const xmlBody = js2xmlparser.parse('clients', createClientDto);
      let { data } = await httpService.post('/clients', xmlBody);
      data = await XmlToJsonService.parse(data);
      if (data.response.errors) throw { message: data.response._message, ...data.response.errors };
  
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findAll() {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      let { data } = await httpService.get('/clients');
      data = await XmlToJsonService.parse(data);
  
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      let { data } = await httpService.get(`/clients/${id}`);
      data = await XmlToJsonService.parse(data);
  
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      const xmlBody = js2xmlparser.parse('clients', updateClientDto);
      let { data } = await httpService.patch(`/clients/${id}`, xmlBody);
      data = await XmlToJsonService.parse(data);
      if (data.response.errors) throw { message: data.response._message, ...data.response.errors };
      
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async remove(id: string) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      let { data } = await httpService.delete(`/clients/${id}`);
      data = await XmlToJsonService.parse(data);
  
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}