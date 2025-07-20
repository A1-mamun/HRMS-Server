import { z } from 'zod';

const PaymentTypeSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Payment type is required')
      .max(25)
      .refine(
        (value) => /^[A-Z]/.test(value),
        'Name must start with a capital letter',
      ),
  }),
});

export const PaymentTypeValidation = {
  PaymentTypeSchema,
};
