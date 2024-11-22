import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { XmlToJsonModule } from '@app/xml-to-json';
import { HandleResponseModule } from '@app/handle-response';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [
    ClientsModule,
    XmlToJsonModule,
    HandleResponseModule,
    WalletsModule
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
