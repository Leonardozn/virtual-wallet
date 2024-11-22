import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now, Types } from 'mongoose';
import { DateTime } from 'ts-luxon';

export type PaymentsDocument = HydratedDocument<Payments>;

export enum PaymentStatusType {
  PENDING = 'pending',
  CONFIRMED = 'confirmed'
}

@Schema()
export class Payments {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Wallets' })
  wallet: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Clients' })
  client: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true, default: DateTime.now() })
  startDate: Date;

  @Prop()
  endDate: Date;
}

export const PaymentsSchema = SchemaFactory.createForClass(Payments);