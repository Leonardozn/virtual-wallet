import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { AxiosConfigModule } from '@app/axios-config';

@Module({
  imports: [AxiosConfigModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
