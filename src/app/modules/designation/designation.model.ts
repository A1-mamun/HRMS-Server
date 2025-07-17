import { model, Schema } from 'mongoose';
import { TDesignation } from './designation.interface';

const DesignationSchema = new Schema<TDesignation>(
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

export const Designation = model('Designation', DesignationSchema);
