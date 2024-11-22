import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { XmlResponseInterceptor } from '../interceptors/xml-response/xml-response.interceptor';
import { HandleResponseService } from '@app/handle-response';

@Controller('clients')
@UseInterceptors(XmlResponseInterceptor)
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private handleResponse: HandleResponseService
  ) {}

  @Post()
  async create(@Body() body: any) {
    const response = await await this.clientsService.create(body.clients);
    return this.handleResponse.buildResponse(response);
  }

  @Get()
  async findAll() {
    const response = await await this.clientsService.findAll();
    return this.handleResponse.buildResponse(response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const response = await this.clientsService.update(id, body.clients);
    return this.handleResponse.buildResponse(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.clientsService.remove(id);
    return this.handleResponse.buildResponse(response);
  }
}