import { model, Schema } from 'mongoose';
import { TPaymentType } from './paymentType.interface';

const PaymentTypeSchema = new Schema<TPaymentType>(
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

export const PaymentType = model('PaymentType', PaymentTypeSchema);
