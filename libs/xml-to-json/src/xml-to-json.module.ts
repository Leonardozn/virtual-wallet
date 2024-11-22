import { Module } from '@nestjs/common';
import { XmlToJsonService } from './xml-to-json.service';

@Module({
  providers: [XmlToJsonService],
  exports: [XmlToJsonService],
})
export class XmlToJsonModule {}
