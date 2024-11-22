import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payments, PaymentsSchema } from './schemas/payments.schema';
import { HandleResponseService } from '@app/handle-response';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payments.name, schema: PaymentsSchema }
    ])
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, HandleResponseService],
})
export class PaymentsModule {}
