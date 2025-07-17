import { model, Schema } from 'mongoose';
import { TEmploymentType } from './employmentType.interface';

const EmploymentTypeSchema = new Schema<TEmploymentType>(
  {
    name: { type: String, required: true },
    organisation: {
      type: Schema.Types.ObjectId,
      ref: 'Organisation',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const EmploymentType = model('EmploymentType', EmploymentTypeSchema);
