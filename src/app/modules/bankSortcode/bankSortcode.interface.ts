import { ObjectId } from 'mongoose';

export interface TBankSortcode {
  name: string;
  organisation: ObjectId;
}
