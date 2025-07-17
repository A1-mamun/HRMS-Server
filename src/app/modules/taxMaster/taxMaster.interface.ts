import { ObjectId } from 'mongoose';

export interface TTaxMaster {
  name: string;
  organisation: ObjectId;
}
