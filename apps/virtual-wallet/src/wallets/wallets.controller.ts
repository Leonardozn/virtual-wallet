import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put, HttpStatus, Res } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { XmlResponseInterceptor } from '../interceptors/xml-response/xml-response.interceptor';
import { ClientsService } from '../clients/clients.service';
import { RandomStringService } from '@app/random-string';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs'
import { PaymentsService } from '../payments/payments.service';
import { PaymentStatusType } from '../payments/schemas/payments.schema';
import { DateTime } from 'ts-luxon';
import { HandleResponseService } from '@app/handle-response';
import { CustomError } from '@app/custom-error';
import { Response } from 'express';

@Controller('wallets')
@UseInterceptors(XmlResponseInterceptor)
export class WalletsController {
  constructor(
    private readonly walletsService: WalletsService,
    private readonly clientsService: ClientsService,
    private readonly randomString: RandomStringService,
    private readonly paymentsService: PaymentsService,
    private readonly handleResponse: HandleResponseService
  ) {}

  @Post()
  async create(@Body() body: any) {
    const response = await this.walletsService.create(body.wallets);
    return this.handleResponse.buildResponse(response);
  }

  @Get()
  async findAll() {
    const response = await this.walletsService.findAll();
    return this.handleResponse.buildResponse(response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.walletsService.findOne(id);
    return this.handleResponse.buildResponse(response);
  }

  @Get('check/:id/:document/:phone')
  async check(@Param('id') id: string, @Param('document') document: string, @Param('phone') phone: string) {
    try {
      const wallet = await this.walletsService.findOne(id);
      const client = await this.clientsService.findOne(wallet.client);

      if (client.document !== document || client.phone !== phone) {
        throw new CustomError('The parameters sent do not match.', HttpStatus.BAD_REQUEST);
      }

      return this.handleResponse.buildResponse(wallet);
    } catch (error) {
      console.error(error);
      return this.handleResponse.buildResponse(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const response = await this.walletsService.update(id, body.wallets);
    return this.handleResponse.buildResponse(response);
  }

  @Put('charge/:id')
  async charge(@Param('id') id: string, @Body() body: any) {
    try {
      const wallet = await this.walletsService.findOne(id);
      const client = await this.clientsService.findOne(wallet.client);

      if (client.document !== body.wallets.document || client.phone !== body.wallets.phone) {
        throw new CustomError('Invalid document or phone.', HttpStatus.BAD_REQUEST);
      }

      const newAmount = Number(body.wallets.amount) + wallet.amount;

      const response = await this.walletsService.update(id, { amount: newAmount });
      return this.handleResponse.buildResponse(response);
    } catch (error) {
      console.error(error);
      return this.handleResponse.buildResponse(error);
    }
  }

  @Put('pay/:id')
  async pay(@Param('id') id: string, @Body() body: any) {
    try {
      const paymentAmount = Number(body.wallets.amount);
      const wallet = await this.walletsService.findOne(id);

      if (wallet.amount >= paymentAmount) {
        const client = await this.clientsService.findOne(wallet.client);
        const token = this.randomString.buildString(6);
        const payload = { email: client.email };
        const sessionId = jwt.sign(payload, token, { expiresIn: process.env.EMAIL_TOKEN_EXPIRE_TIME });

        const newPayment = await this.paymentsService.create({
          wallet: wallet._id,
          client: client._id,
          amount: paymentAmount,
          status: PaymentStatusType.PENDING,
          startDate: DateTime.now()
        });

        if (newPayment._id) {
          const inboxFileRoot = `${process.cwd()}/inbox.json`
  
          if (!fs.existsSync(inboxFileRoot)) fs.writeFileSync(inboxFileRoot, '[]');
  
          let inboxFile = fs.readFileSync(inboxFileRoot, 'utf-8');
          let inboxFileContent = JSON.parse(inboxFile);
  
          const index = inboxFileContent.findIndex((el: any) => el.email === client.email);
  
          const newTokenSent = {
            email: client.email,
            url: `${process.env.API_BASE_URL}/wallets/confirmpayment/${newPayment._id}/${sessionId.replaceAll('.', process.env.POINT_RECLACING)}`,
            token
          };
          
          if (index > -1) {
            inboxFileContent[index] = newTokenSent
          } else {
            inboxFileContent.push(newTokenSent);
          }
  
          fs.writeFileSync(inboxFileRoot, JSON.stringify(inboxFileContent, null, 2), 'utf-8');
          
          return this.handleResponse.buildResponse({ message: 'Code sent to email. Please do not share the code. When entering, insert the code.' });
        }

        throw new CustomError('Error at create the payment.', HttpStatus.BAD_REQUEST);
      }

      throw new CustomError('The wallet does not have enough funds.', HttpStatus.BAD_REQUEST);
    } catch (error) {
      console.error(error);
      return this.handleResponse.buildResponse(error);
    }
  }

  @Put('confirmpayment/:paymentid/:sessionid')
  async confirmpayment(@Param('paymentid') paymentid: string, @Param('sessionid') sessionid: string, @Body() body: any) {
    try {
      const payment = await this.paymentsService.findOne(paymentid);
      const wallet = await this.walletsService.findOne(payment.wallet);
      
      if (wallet.amount >= payment.amount) {
        sessionid = sessionid.replaceAll(process.env.POINT_RECLACING, '.');
        const decoded = jwt.verify(sessionid, body.wallets.token);

        let newAmount = wallet.amount - payment.amount;
        await this.walletsService.update(wallet._id, { amount: newAmount });
        await this.paymentsService.update(payment._id, { status: PaymentStatusType.CONFIRMED, endDate: DateTime.now() });

        return this.handleResponse.buildResponse({ message: 'Payment confirmed. Thank you for your purchase!' });
      }

      throw new CustomError('The wallet does not have enough funds.', HttpStatus.BAD_REQUEST);
    } catch (error) {
      console.error(error);
      return this.handleResponse.buildResponse(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.walletsService.remove(id);
    return this.handleResponse.buildResponse(response);
  }
}