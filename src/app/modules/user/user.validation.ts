import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1)
      .max(100, 'Atmost 100 characters are allowed')
      .refine(
        (value) => /^[A-Z]/.test(value),
        'Name must start with a capital letter',
      ),
    email: z.string().email(),
    password: z.string().min(6).max(20),
  }),
});

export const userValidations = { registerUserValidationSchema };
