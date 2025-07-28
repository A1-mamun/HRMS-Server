import { z } from 'zod';

const DesignationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Designation is required')
      .max(100, 'Atmost 100 characters are allowed')
      .refine(
        (value) => /^[A-Z]/.test(value),
        'Name must start with a capital letter',
      ),
  }),
});

export const DesignationValidation = {
  DesignationSchema,
};
