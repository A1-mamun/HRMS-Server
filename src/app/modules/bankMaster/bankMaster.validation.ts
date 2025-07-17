import { z } from 'zod';

const BankMasterSchema = z.object({
  name: z
    .string()
    .min(1, 'BankMaster name is required')
    .max(25)
    .refine(
      (value) => /^[A-Z]/.test(value),
      'Name must start with a capital letter',
    ),
});

export const BankMasterValidation = {
  BankMasterSchema,
};
