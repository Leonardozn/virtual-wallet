import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WalletsDocument = HydratedDocument<Wallets>;

@Schema()
export class Wallets {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Clients' })
  client: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  amount: number;
}

export const WalletsSchema = SchemaFactory.createForClass(Wallets);