import { ObjectId } from 'mongoose';

export interface TBankMaster {
  name: string;
  organisation: ObjectId;
}
