import { model, Schema } from 'mongoose';
import { TBankMaster } from './bankMaster.interface';

const BankMasterSchema = new Schema<TBankMaster>(
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

export const BankMaster = model('BankMaster', BankMasterSchema);
