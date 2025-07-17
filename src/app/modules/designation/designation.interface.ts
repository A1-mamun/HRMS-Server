import { ObjectId } from 'mongoose';

export interface TDesignation {
  name: string;
  organisation: ObjectId;
}
