import { Module } from '@nestjs/common';
import { LibTestService } from './lib-test.service';

@Module({
  providers: [LibTestService],
  exports: [LibTestService],
})
export class LibTestModule {}
