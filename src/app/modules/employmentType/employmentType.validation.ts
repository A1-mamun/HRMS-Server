import { z } from 'zod';

const EmploymentTypeSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Employment type is required')
      .max(100, 'Atmost 100 characters are allowed')
      .refine(
        (value) => /^[A-Z]/.test(value),
        'Must start with a capital letter',
      ),
  }),
});

export const EmploymentTypeValidation = {
  EmploymentTypeSchema,
};
