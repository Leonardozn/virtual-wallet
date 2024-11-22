import { MiddlewareConsumer, Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallets, WalletsSchema } from './schemas/wallets.schema';
import { XmlRequestMiddleware } from '../middlewares/xml-request/xml-request.middleware';
import { ClientsModule } from '../clients/clients.module';
import { ClientsService } from '../clients/clients.service';
import { Clients, ClientsSchema } from '../clients/schemas/clients.schema';
import { RandomStringModule } from '@app/random-string';
import { ParseObjService } from '@app/parse-obj';
import { PaymentsModule } from '../payments/payments.module';
import { PaymentsService } from '../payments/payments.service';
import { Payments, PaymentsSchema } from '../payments/schemas/payments.schema';
import { HandleResponseService } from '@app/handle-response';

@Module({
  imports: [
    RandomStringModule,
    ClientsModule,
    PaymentsModule,
    MongooseModule.forFeature([
      { name: Wallets.name, schema: WalletsSchema },
      { name: Clients.name, schema: ClientsSchema },
      { name: Payments.name, schema: PaymentsSchema }
    ])
  ],
  controllers: [WalletsController],
  providers: [WalletsService, ClientsService, ParseObjService, PaymentsService, HandleResponseService],
})

export class WalletsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(XmlRequestMiddleware)
      .forRoutes(WalletsController);
  }
}
