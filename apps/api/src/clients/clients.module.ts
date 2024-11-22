import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { AxiosConfigModule } from '@app/axios-config';
import { HandleResponseService } from '@app/handle-response';

@Module({
  imports: [AxiosConfigModule],
  controllers: [ClientsController],
  providers: [ClientsService, HandleResponseService],
})
export class ClientsModule {}
