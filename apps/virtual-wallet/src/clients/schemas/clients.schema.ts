import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientsDocument = HydratedDocument<Clients>;

@Schema()
export class Clients {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;
}

export const ClientsSchema = SchemaFactory.createForClass(Clients);