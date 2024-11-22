import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { XmlResponseInterceptor } from '../interceptors/xml-response/xml-response.interceptor';

@Controller('payments')
@UseInterceptors(XmlResponseInterceptor)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() body: any) {
    try {
      return await this.paymentsService.create(body.payments);
    } catch (error) {
      console.error(error);
      return error.errors || error;
    }
  }

  @Get()
  async findAll() {
    return await this.paymentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.paymentsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    try {
      return await this.paymentsService.update(id, body.payments);
    } catch (error) {
      console.error(error);
      return error.errors || error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.paymentsService.remove(id);
  }
}