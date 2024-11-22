import { Module } from '@nestjs/common';
import { CustomError } from './custom-error.service';

@Module({
  providers: [CustomError],
  exports: [CustomError],
})
export class CustomErrorModule {}
