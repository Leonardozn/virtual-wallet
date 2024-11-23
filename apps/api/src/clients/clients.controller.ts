import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { HandleResponseService } from '@app/handle-response';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('clients')
@ApiTags('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private handleResponse: HandleResponseService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a client' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the new client', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.BAD_REQUEST) } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.NOT_FOUND) } })
  async create(@Res() res: Response, @Body() createClientDto: CreateClientDto) {
    let response = await this.clientsService.create(createClientDto);
    
    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }

  @Get()
  @ApiOperation({ summary: 'Return all clients' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return a list of clients', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return a empty list', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK).content = [] } })
  async findAll(@Res() res: Response) {
    let response = await this.clientsService.findAll();
    
    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a client' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return one client', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.BAD_REQUEST) } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.NOT_FOUND) } })
  async findOne(@Res() res: Response, @Param('id') id: string) {
    let response = await this.clientsService.findOne(id);
    
    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a client, this may be partial' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the edited client', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.BAD_REQUEST) } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.NOT_FOUND) } })
  async update(@Res() res: Response, @Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    let response = await this.clientsService.update(id, updateClientDto);
    
    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a client' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return "1" if it was deleted', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.BAD_REQUEST) } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.NOT_FOUND) } })
  async remove(@Res() res: Response, @Param('id') id: string) {
    let response = await this.clientsService.remove(id);
    
    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }
}