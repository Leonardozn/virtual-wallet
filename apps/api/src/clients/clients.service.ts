import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AxiosConfigService } from '@app/axios-config';
import * as js2xmlparser from 'js2xmlparser';
import { XmlToJsonService } from '@app/xml-to-json';
import { HandleResponseService, ResponseType } from '@app/handle-response';

@Injectable()
export class ClientsService {
  constructor(
    private axiosService: AxiosConfigService,
    private handleResponse: HandleResponseService
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
  
      return this.handleResponse.buildResponse(data.response, ResponseType.CREATED);
    } catch (error) {
      return this.handleResponse.buildResponse(error, ResponseType.ERROR);
    }
  }

  async findAll() {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      let { data } = await httpService.get('/clients');
      data = await XmlToJsonService.parse(data);
  
      return this.handleResponse.buildResponse(data.response, ResponseType.SUCCESS);
    } catch (error) {
      return this.handleResponse.buildResponse(error, ResponseType.ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      let { data } = await httpService.get(`/clients/${id}`);
      data = await XmlToJsonService.parse(data);
  
      return this.handleResponse.buildResponse(data.response, ResponseType.SUCCESS);
    } catch (error) {
      return this.handleResponse.buildResponse(error, ResponseType.ERROR);
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      const xmlBody = js2xmlparser.parse('clients', updateClientDto);
      let { data } = await httpService.patch(`/clients/${id}`, xmlBody);
      data = await XmlToJsonService.parse(data);
      if (data.response.errors) throw { message: data.response._message, ...data.response.errors };
      
      return this.handleResponse.buildResponse(data.response, ResponseType.SUCCESS);
    } catch (error) {
      return this.handleResponse.buildResponse(error, ResponseType.ERROR);
    }
  }

  async remove(id: string) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      let { data } = await httpService.delete(`/clients/${id}`);
      data = await XmlToJsonService.parse(data);
  
      return this.handleResponse.buildResponse(data.response, ResponseType.SUCCESS);
    } catch (error) {
      return this.handleResponse.buildResponse(error, ResponseType.ERROR);
    }
  }
}