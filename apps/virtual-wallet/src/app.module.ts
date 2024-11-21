import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { MongodbConnModule } from '@app/mongodb-conn';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule,
    MongodbConnModule,
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
