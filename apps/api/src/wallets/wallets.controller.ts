import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ChargeWalletDto } from './dto/charge-wallet.dto';
import { PayWalletDto } from './dto/pay-wallet.dto';
import { ConfirmPaymentWalletDto } from './dto/confir-payment.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(id);
  }

  @Get('check/:id/:document/:phone')
  check(@Param('id') id: string, @Param('document') document: string, @Param('phone') phone: string) {
    return this.walletsService.check(id, document, phone);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(id, updateWalletDto);
  }

  @Put('charge/:id')
  charge(@Param('id') id: string, @Body() chargeWalletDto: ChargeWalletDto) {
    return this.walletsService.charge(id, chargeWalletDto);
  }

  @Put('pay/:id')
  pay(@Param('id') id: string, @Body() payWalletDto: PayWalletDto) {
    return this.walletsService.pay(id, payWalletDto);
  }

  @Put('confirmpayment/:paymentid/:sessionid')
  confirmpayment(@Param('paymentid') paymentid: string, @Param('sessionid') sessionid: string, @Body() confirmpaymentWalletDto: ConfirmPaymentWalletDto) {
    return this.walletsService.confirmpayment(paymentid, sessionid, confirmpaymentWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(id);
  }
}