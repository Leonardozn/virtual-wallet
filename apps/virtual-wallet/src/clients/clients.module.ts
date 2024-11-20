import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { LibTestModule } from '@app/lib-test';

@Module({
  imports: [LibTestModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
