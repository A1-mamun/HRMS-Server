import { model, Schema } from 'mongoose';
import { TBankSortcode } from './bankSortcode.interface';

const BankSortcodeSchema = new Schema<TBankSortcode>(
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

export const BankSortcode = model('BankSortcode', BankSortcodeSchema);
