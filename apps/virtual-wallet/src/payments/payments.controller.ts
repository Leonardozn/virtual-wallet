import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { XmlResponseInterceptor } from '../interceptors/xml-response/xml-response.interceptor';
import { HandleResponseService } from '@app/handle-response';

@Controller('payments')
@UseInterceptors(XmlResponseInterceptor)
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private handleResponse: HandleResponseService
  ) {}

  @Post()
  async create(@Body() body: any) {
    const response = await this.paymentsService.create(body.payments);
    return this.handleResponse.buildResponse(response);
  }

  @Get()
  async findAll() {
    const response = await this.paymentsService.findAll();
    return this.handleResponse.buildResponse(response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.paymentsService.findOne(id);
    return this.handleResponse.buildResponse(response);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const response = await this.paymentsService.update(id, body.payments);
    return this.handleResponse.buildResponse(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.paymentsService.remove(id);
    return this.handleResponse.buildResponse(response);
  }
}