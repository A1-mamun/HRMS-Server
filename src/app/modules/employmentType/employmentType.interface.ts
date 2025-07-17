import { ObjectId } from 'mongoose';

export interface TEmploymentType {
  name: string;
  organisation: ObjectId;
}
