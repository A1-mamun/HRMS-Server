import { Router } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import { WedgesPayModeValidation } from './wedgesPayMode.validation';
import validateRequest from '../../middlewares/validateRequest';
import { WedgesPayModeControllers } from './wedgesPayMode.controller';

const router = Router();

router.post(
  '/create-wedges-pay-mode',
  auth(USER_ROLE.employer),
  validateRequest(WedgesPayModeValidation.WedgesPayModeSchema),
  WedgesPayModeControllers.createWedgesPayMode,
);

router.get(
  '/wedges-pay-modes',
  auth(USER_ROLE.employer),
  WedgesPayModeControllers.getAllWedgesPayModes,
);

router.patch(
  '/:id',
  auth(USER_ROLE.employer),
  validateRequest(WedgesPayModeValidation.WedgesPayModeSchema),
  WedgesPayModeControllers.updateWedgesPayMode,
);

router.delete(
  '/:id',
  auth(USER_ROLE.employer),
  WedgesPayModeControllers.deleteWedgesPayMode,
);

export const WedgesPayModeRoutes = router;
