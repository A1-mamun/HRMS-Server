import { Router } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EmploymentTypeValidation } from './employmentType.validation';
import { EmploymentTypeControllers } from './employmentType.controller';

const router = Router();

router.post(
  '/create-employment-type',
  auth(USER_ROLE.employer),
  validateRequest(EmploymentTypeValidation.EmploymentTypeSchema),
  EmploymentTypeControllers.createEmploymentType,
);

router.get(
  '/employment-types',
  auth(USER_ROLE.employer),
  EmploymentTypeControllers.getAllEmploymentTypes,
);

router.patch(
  '/:id',
  auth(USER_ROLE.employer),
  validateRequest(EmploymentTypeValidation.EmploymentTypeSchema),
  EmploymentTypeControllers.updateEmploymentType,
);

router.delete(
  '/:id',
  auth(USER_ROLE.employer),
  EmploymentTypeControllers.deleteEmploymentType,
);

export const EmploymentTypeRoutes = router;
