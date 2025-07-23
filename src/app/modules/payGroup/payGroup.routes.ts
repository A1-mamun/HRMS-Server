import { Router } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import { PayGroupValidation } from './payGroup.validation';
import validateRequest from '../../middlewares/validateRequest';
import { PayGroupControllers } from './payGroup.controller';

const router = Router();

router.post(
  '/create-PayGroup',
  auth(USER_ROLE.employer),
  validateRequest(PayGroupValidation.PayGroupSchema),
  PayGroupControllers.createPayGroup,
);

router.get(
  '/pay-groups',
  auth(USER_ROLE.employer),
  validateRequest(PayGroupValidation.PayGroupSchema),
  PayGroupControllers.getAllPayGroups,
);

router.patch(
  '/:id',
  auth(USER_ROLE.employer),
  validateRequest(PayGroupValidation.PayGroupSchema),
  PayGroupControllers.updatePayGroup,
);

router.delete(
  '/:id',
  auth(USER_ROLE.employer),
  PayGroupControllers.deletePayGroup,
);

export const PayGroupRoutes = router;
