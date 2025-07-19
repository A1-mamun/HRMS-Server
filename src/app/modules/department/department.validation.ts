import { z } from 'zod';

const DepartmentSchema = z.object({
  name: z
    .string()
    .min(1, 'Department name is required')
    .max(25)
    .refine(
      (value) => /^[A-Z]/.test(value),
      'Name must start with a capital letter',
    ),
});

export const DepartmentValidation = {
  DepartmentSchema,
};
