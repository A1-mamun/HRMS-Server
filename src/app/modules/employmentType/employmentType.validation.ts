import { z } from 'zod';

const EmploymentTypeSchema = z.object({
  name: z
    .string()
    .min(1, 'Employment type is required')
    .max(25)
    .refine(
      (value) => /^[A-Z]/.test(value),
      'Must start with a capital letter',
    ),
});

export const EmploymentTypeValidation = {
  EmploymentTypeSchema,
};
