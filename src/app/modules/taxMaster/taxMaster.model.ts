import { model, Schema } from 'mongoose';
import { TTaxMaster } from './taxMaster.interface';

const TaxMasterSchema = new Schema<TTaxMaster>(
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

export const TaxMaster = model('TaxMaster', TaxMasterSchema);
