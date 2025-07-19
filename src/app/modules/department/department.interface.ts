import { ObjectId } from 'mongoose';

export interface TDepartment {
  name: string;
  organisation: ObjectId;
}
