import { z } from 'zod';

const AnnualPaySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Annual pay name is required')
      .max(100, 'Atmost 100 characters are allowed')
      .refine(
        (value) => /^[A-Z]/.test(value),
        'Name must start with a capital letter',
      ),
  }),
});

export const AnnualPayValidation = {
  AnnualPaySchema,
};
