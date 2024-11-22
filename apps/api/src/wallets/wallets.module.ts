import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { AxiosConfigModule } from '@app/axios-config';
import { HandleResponseService } from '@app/handle-response';

@Module({
  imports: [AxiosConfigModule],
  controllers: [WalletsController],
  providers: [WalletsService, HandleResponseService],
})
export class WalletsModule {}
