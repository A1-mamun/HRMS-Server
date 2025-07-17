import { model, Schema } from 'mongoose';
import { TPayGroup } from './payGroup.interface';

const PayGroupSchema = new Schema<TPayGroup>(
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

export const PayGroup = model('PayGroup', PayGroupSchema);
