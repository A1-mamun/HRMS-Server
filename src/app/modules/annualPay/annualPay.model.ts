import { model, Schema } from 'mongoose';
import { TAnnualPay } from './annualPay.interface';

const AnnualPaySchema = new Schema<TAnnualPay>(
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

export const AnnualPay = model('AnnualPay', AnnualPaySchema);
