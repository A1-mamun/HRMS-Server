import { ObjectId } from 'mongoose';

export interface TPayGroup {
  name: string;
  organisation: ObjectId;
}
