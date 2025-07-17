import { z } from 'zod';

const PaymentTypeSchema = z.object({
  name: z
    .string()
    .min(1, 'PaymentType name is required')
    .max(25)
    .refine(
      (value) => /^[A-Z]/.test(value),
      'Name must start with a capital letter',
    ),
});

export const PaymentTypeValidation = {
  PaymentTypeSchema,
};
