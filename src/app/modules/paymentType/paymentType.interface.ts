import { ObjectId } from 'mongoose';

export interface TPaymentType {
  name: string;
  organisation: ObjectId;
}
