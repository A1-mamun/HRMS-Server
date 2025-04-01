import { TRole } from './user.interface';

export const Role: TRole[] = ['admin', 'employer', 'employee'];

export const USER_ROLE = {
  admin: 'admin',
  employer: 'employer',
  employee: 'employee',
} as const;
