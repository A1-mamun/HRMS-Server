import { z } from 'zod';

const TaxMasterSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Tax master is required')
      .max(25)
      .refine(
        (value) => /^[A-Z]/.test(value),
        'Name must start with a capital letter',
      ),
  }),
});

export const TaxMasterValidation = {
  TaxMasterSchema,
};
