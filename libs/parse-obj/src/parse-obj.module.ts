import { Module } from '@nestjs/common';
import { ParseObjService } from './parse-obj.service';

@Module({
  providers: [ParseObjService],
  exports: [ParseObjService],
})
export class ParseObjModule {}
