/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Otp extends mongoose.Document {
  @Prop()
  email: string;

  @Prop({ unique: true })
  otpKey: string;

  @Prop({ default: false })
  used: boolean;

  @Prop()
  expireIn: number;

  @Prop({ default: false })
  expire: boolean;
}

export const otpSchema = SchemaFactory.createForClass(Otp);
