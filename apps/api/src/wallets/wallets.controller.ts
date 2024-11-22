import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ChargeWalletDto } from './dto/charge-wallet.dto';
import { PayWalletDto } from './dto/pay-wallet.dto';
import { ConfirmPaymentWalletDto } from './dto/confir-payment.dto';
import { HandleResponseService } from '@app/handle-response';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('wallets')
@ApiTags('wallets')
export class WalletsController {
  constructor(
    private readonly walletsService: WalletsService,
    private handleResponse: HandleResponseService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a wallet' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the new wallet', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.BAD_REQUEST) } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.NOT_FOUND) } })
  async create(@Res() res: Response, @Body() createWalletDto: CreateWalletDto) {
    let response = await this.walletsService.create(createWalletDto);

    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }

  @Get()
  @ApiOperation({ summary: 'Return all wallets' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return a list of wallets', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return a empty list', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK).content = [] } })
  async findAll(@Res() res: Response) {
    let response = await this.walletsService.findAll();

    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a wallet' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return one wallet', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.BAD_REQUEST) } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.NOT_FOUND) } })
  async findOne(@Res() res: Response, @Param('id') id: string) {
    let response = await this.walletsService.findOne(id);

    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }

  @Get('check/:id/:document/:phone')
  @ApiOperation({ summary: 'Return a wallet' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return one wallet', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.BAD_REQUEST) } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.NOT_FOUND) } })
  async check(@Res() res: Response, @Param('id') id: string, @Param('document') document: string, @Param('phone') phone: string) {
    let response = await this.walletsService.check(id, document, phone);

    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit a wallet, this may be partial' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the edited wallet', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.BAD_REQUEST) } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.NOT_FOUND) } })
  async update(@Res() res: Response, @Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    let response = await this.walletsService.update(id, updateWalletDto);

    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }

  @Put('charge/:id')
  @ApiOperation({ summary: 'Return a wallet' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the wallet edited', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.BAD_REQUEST) } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.NOT_FOUND) } })
  async charge(@Res() res: Response, @Param('id') id: string, @Body() chargeWalletDto: ChargeWalletDto) {
    let response = await this.walletsService.charge(id, chargeWalletDto);

    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }

  @Put('pay/:id')
  @ApiOperation({ summary: 'Return a message' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return a message indicating that you must confirm the payment', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.BAD_REQUEST) } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.NOT_FOUND) } })
  async pay(@Res() res: Response, @Param('id') id: string, @Body() payWalletDto: PayWalletDto) {
    let response = await this.walletsService.pay(id, payWalletDto);

    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }

  @Put('confirmpayment/:paymentid/:sessionid')
  @ApiOperation({ summary: 'Return a message' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return a message confirming payment', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.BAD_REQUEST) } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.NOT_FOUND) } })
  async confirmpayment(@Res() res: Response, @Param('paymentid') paymentid: string, @Param('sessionid') sessionid: string, @Body() confirmpaymentWalletDto: ConfirmPaymentWalletDto) {
    let response = await this.walletsService.confirmpayment(paymentid, sessionid, confirmpaymentWalletDto);

    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a wallet' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return "1" if it was deleted', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.OK) } })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.BAD_REQUEST) } })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found', schema: { example: HandleResponseService.getExampleResponseFormat(HttpStatus.NOT_FOUND) } })
  async remove(@Res() res: Response, @Param('id') id: string) {
    let response = await this.walletsService.remove(id);

    response = this.handleResponse.buildResponse(response);
    return res.status(response.statusCode).json(response);
  }
}