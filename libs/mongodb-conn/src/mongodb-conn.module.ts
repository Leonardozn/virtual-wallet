import { Module } from '@nestjs/common';
import { MongodbConnService } from './mongodb-conn.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`)
  ],
  providers: [MongodbConnService],
  exports: [MongodbConnService],
})
export class MongodbConnModule {}
