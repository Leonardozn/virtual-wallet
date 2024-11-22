import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AxiosConfigService {
  private static instance: AxiosConfigService;
  private virtualWalletConfig: any;

  constructor() {}

  static getInstance() {
    if (!this.instance) this.instance = new AxiosConfigService();
    return this.instance;
  }

  getVirtualWalletConfig() {
    if (!this.virtualWalletConfig) {
      this.virtualWalletConfig = axios.create({
        baseURL: process.env.SOAP_BASE_URL,
        params: { format: 'xml' },
        headers: { 'Content-Type': 'application/xml' },
        responseType: "document",
      });
    }

    return this.virtualWalletConfig;
  }
}
