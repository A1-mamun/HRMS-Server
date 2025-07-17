import { Router } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

import validateRequest from '../../middlewares/validateRequest';
import { DesignationValidation } from './designation.validation';
import { DesignationControllers } from './designation.controller';

const router = Router();

router.post(
  '/create-designation',
  auth(USER_ROLE.employer),
  validateRequest(DesignationValidation.DesignationSchema),
  DesignationControllers.createDesignation,
);

router.patch(
  '/:id',
  auth(USER_ROLE.employer),
  validateRequest(DesignationValidation.DesignationSchema),
  DesignationControllers.updateDesignation,
);

router.delete(
  '/:id',
  auth(USER_ROLE.employer),
  DesignationControllers.deleteDesignation,
);

export const DepartmentRoutes = router;
