import { Module } from '@nestjs/common';
import { HandleResponseService } from './handle-response.service';
import { CustomError } from '@app/custom-error';

@Module({
  providers: [HandleResponseService, CustomError],
  exports: [HandleResponseService],
})
export class HandleResponseModule {}
