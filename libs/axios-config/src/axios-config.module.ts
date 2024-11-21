import { Module } from '@nestjs/common';
import { AxiosConfigService } from './axios-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  providers: [AxiosConfigService],
  exports: [AxiosConfigService],
})
export class AxiosConfigModule {}
