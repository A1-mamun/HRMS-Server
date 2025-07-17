import { z } from 'zod';

const BankSortcodeSchema = z.object({
  name: z
    .string()
    .min(1, 'Bank sort code is required')
    .max(25)
    .refine(
      (value) => /^[A-Z]/.test(value),
      'Name must start with a capital letter',
    ),
});

export const BankSortcodeValidation = {
  BankSortcodeSchema,
};
