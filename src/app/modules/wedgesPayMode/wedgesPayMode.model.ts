import { model, Schema } from 'mongoose';
import { TWedgesPayMode } from './wedgesPayMode.interface';

const WedgesPayModeSchema = new Schema<TWedgesPayMode>(
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

export const WedgesPayMode = model('WedgesPayMode', WedgesPayModeSchema);
