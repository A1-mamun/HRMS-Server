import { model, Schema } from 'mongoose';
import { TDepartment } from './department.interface';

const DepartmentSchema = new Schema<TDepartment>(
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

export const Department = model('Department', DepartmentSchema);
