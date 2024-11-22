import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { MongodbConnModule } from '@app/mongodb-conn';
import { ConfigModule } from '@nestjs/config';
import { WalletsModule } from './wallets/wallets.module';
import { ParseObjModule } from '@app/parse-obj';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ClientsModule,
    MongodbConnModule,
    ConfigModule.forRoot(),
    WalletsModule,
    ParseObjModule,
    PaymentsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
