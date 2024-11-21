import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { XmlResponseInterceptor } from '../interceptors/xml-response/xml-response.interceptor';

@Controller('clients')
@UseInterceptors(XmlResponseInterceptor)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Body() body: any) {
    try {
      return await this.clientsService.create(body.clients);
    } catch (error) {
      console.error(error);
      return error.errors || error;
    }
  }

  @Get()
  async findAll() {
    return await this.clientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    try {
      return await this.clientsService.update(id, body.clients);
    } catch (error) {
      console.error(error);
      return error.errors || error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.clientsService.remove(id);
  }
}
