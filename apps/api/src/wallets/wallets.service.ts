import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { AxiosConfigService } from '@app/axios-config';
import * as js2xmlparser from 'js2xmlparser';
import { XmlToJsonService } from '@app/xml-to-json';
import { ChargeWalletDto } from './dto/charge-wallet.dto';
import { PayWalletDto } from './dto/pay-wallet.dto';
import { ConfirmPaymentWalletDto } from './dto/confir-payment.dto';

@Injectable()
export class WalletsService {
  constructor(
    private axiosService: AxiosConfigService
  ) {
    this.axiosService = AxiosConfigService.getInstance();
  }

  async create(createWalletDto: CreateWalletDto) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      const xmlBody = js2xmlparser.parse('wallets', createWalletDto);
      let { data } = await httpService.post('/wallets', xmlBody);
      data = await XmlToJsonService.parse(data);
      if (data.response.errors) throw { message: data.response._message, ...data.response.errors };
      
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findAll() {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      let { data } = await httpService.get('/wallets');
      data = await XmlToJsonService.parse(data);
  
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      let { data } = await httpService.get(`/wallets/${id}`);
      data = await XmlToJsonService.parse(data);
  
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async check(id: string, document: string, phone: string) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      let { data } = await httpService.get(`/wallets/check/${id}/${document}/${phone}`);
      data = await XmlToJsonService.parse(data);
      
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      const xmlBody = js2xmlparser.parse('wallets', updateWalletDto);
      let { data } = await httpService.patch(`/wallets/${id}`, xmlBody);
      data = await XmlToJsonService.parse(data);
      if (data.response.errors) throw { message: data.response._message, ...data.response.errors };
      
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async charge(id: string, chargeWalletDto: ChargeWalletDto) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      const xmlBody = js2xmlparser.parse('wallets', chargeWalletDto);
      let { data } = await httpService.put(`/wallets/charge/${id}`, xmlBody);
      data = await XmlToJsonService.parse(data);
      if (data.response.errors) throw { message: data.response._message, ...data.response.errors };
      
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async pay(id: string, payWalletDto: PayWalletDto) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      const xmlBody = js2xmlparser.parse('wallets', payWalletDto);
      let { data } = await httpService.put(`/wallets/pay/${id}`, xmlBody);
      data = await XmlToJsonService.parse(data);
      if (data.response.errors) throw { message: data.response._message, ...data.response.errors };
      
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async confirmpayment(paymentid: string, sessionid: string, confirmpaymentWalletDto: ConfirmPaymentWalletDto) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      const xmlBody = js2xmlparser.parse('wallets', confirmpaymentWalletDto);
      let { data } = await httpService.put(`/wallets/confirmpayment/${paymentid}/${sessionid}`, xmlBody);
      data = await XmlToJsonService.parse(data);
      if (data.response.errors) throw { message: data.response._message, ...data.response.errors };
      
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async remove(id: string) {
    try {
      const httpService = this.axiosService.getVirtualWalletConfig();
      let { data } = await httpService.delete(`/wallets/${id}`);
      data = await XmlToJsonService.parse(data);
  
      return data.response;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}