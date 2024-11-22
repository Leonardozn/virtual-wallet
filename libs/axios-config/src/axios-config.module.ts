import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AxiosConfigService } from './axios-config.service';

@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  providers: [AxiosConfigService],
  exports: [AxiosConfigService],
})
export class AxiosConfigModule {}
