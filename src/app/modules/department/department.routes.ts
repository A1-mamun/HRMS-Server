import { Router } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import { DepartmentValidation } from './department.validation';
import validateRequest from '../../middlewares/validateRequest';
import { DepartmentControllers } from './department.controller';

const router = Router();

router.post(
  '/create-department',
  auth(USER_ROLE.employer),
  validateRequest(DepartmentValidation.DepartmentSchema),
  DepartmentControllers.createDepartment,
);
router.get(
  '/departments',
  auth(USER_ROLE.employer),
  validateRequest(DepartmentValidation.DepartmentSchema),
  DepartmentControllers.getAllDepartments,
);

router.patch(
  '/:id',
  auth(USER_ROLE.employer),
  validateRequest(DepartmentValidation.DepartmentSchema),
  DepartmentControllers.updateDepartment,
);

router.delete(
  '/:id',
  auth(USER_ROLE.employer),
  DepartmentControllers.deleteDepartment,
);

export const DepartmentRoutes = router;
