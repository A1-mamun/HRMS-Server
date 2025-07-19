import { ObjectId } from 'mongoose';

export interface TAnnualPay {
  name: string;
  organisation: ObjectId;
}
