import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put, HttpException, HttpStatus } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { XmlResponseInterceptor } from '../interceptors/xml-response/xml-response.interceptor';
import { ClientsService } from '../clients/clients.service';
import { RandomStringService } from '@app/random-string';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs'
import { PaymentsService } from '../payments/payments.service';
import { PaymentStatusType } from '../payments/schemas/payments.schema';
import { DateTime } from 'ts-luxon';

@Controller('wallets')
@UseInterceptors(XmlResponseInterceptor)
export class WalletsController {
  constructor(
    private readonly walletsService: WalletsService,
    private readonly clientsService: ClientsService,
    private readonly randomString: RandomStringService,
    private readonly paymentsService: PaymentsService
  ) {}

  @Post()
  async create(@Body() body: any) {
    try {
      return await this.walletsService.create(body.wallets);
    } catch (error) {
      console.error(error);
      return error.errors || error;
    }
  }

  @Get()
  async findAll() {
    return await this.walletsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.walletsService.findOne(id);
  }

  @Get('check/:id/:document/:phone')
  async check(@Param('id') id: string, @Param('document') document: string, @Param('phone') phone: string) {
    try {
      const wallet = await this.walletsService.findOne(id);
      const client = await this.clientsService.findOne(wallet.client);

      if (client.document !== document || client.phone !== phone) {
        throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: 'The parameters sent do not match.' }, HttpStatus.BAD_REQUEST);
      }

      return wallet;
    } catch (error) {
      console.error(error);
      return error.errors || error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    try {
      return await this.walletsService.update(id, body.wallets);
    } catch (error) {
      console.error(error);
      return error.errors || error;
    }
  }

  @Put('charge/:id')
  async charge(@Param('id') id: string, @Body() body: any) {
    try {
      const wallet = await this.walletsService.findOne(id);
      const client = await this.clientsService.findOne(wallet.client);

      if (client.document !== body.wallets.document || client.phone !== body.wallets.phone) {
        throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: 'Invalid document or phone.' }, HttpStatus.BAD_REQUEST);
      }

      const newAmount = Number(body.wallets.amount) + wallet.amount;

      return await this.walletsService.update(id, { amount: newAmount });
    } catch (error) {
      console.error(error);
      return error.errors || error;
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
          
          return { message: 'Code sent to email. Please do not share the code. When entering, insert the code.' };
        }

        throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: 'Error at create the payment.' }, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: 'The wallet does not have enough funds.' }, HttpStatus.BAD_REQUEST);
    } catch (error) {
      console.error(error);
      return error.errors || error;
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

        return { message: 'Payment confirmed. Thank you for your purchase!' };
      }

      throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: 'The wallet does not have enough funds.' }, HttpStatus.BAD_REQUEST);
    } catch (error) {
      console.error(error);
      return error.errors || error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.walletsService.remove(id);
  }
}