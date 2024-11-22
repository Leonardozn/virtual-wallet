import { Module } from '@nestjs/common';
import { HandleResponseService } from './handle-response.service';

@Module({
  providers: [HandleResponseService],
  exports: [HandleResponseService],
})
export class HandleResponseModule {}
