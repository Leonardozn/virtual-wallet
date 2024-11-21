import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Clients, ClientsSchema } from './schemas/clients.schema';
import { XmlRequestMiddleware } from '../middlewares/xml-request/xml-request.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Clients.name, schema: ClientsSchema }
    ]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})

export class ClientsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(XmlRequestMiddleware)
      .forRoutes(ClientsController);
  }
}
