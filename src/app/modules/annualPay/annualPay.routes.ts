import { Router } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import { AnnualPayValidation } from './annualPay.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AnnualPayControllers } from './annualPay.controller';

const router = Router();

router.post(
  '/create-AnnualPay',
  auth(USER_ROLE.employer),
  validateRequest(AnnualPayValidation.AnnualPaySchema),
  AnnualPayControllers.createAnnualPay,
);

router.get(
  '/annualPays',
  auth(USER_ROLE.employer),
  validateRequest(AnnualPayValidation.AnnualPaySchema),
  AnnualPayControllers.getAllAnnualPays,
);

router.patch(
  '/:id',
  auth(USER_ROLE.employer),
  validateRequest(AnnualPayValidation.AnnualPaySchema),
  AnnualPayControllers.updateAnnualPay,
);

router.delete(
  '/:id',
  auth(USER_ROLE.employer),
  AnnualPayControllers.deleteAnnualPay,
);

export const AnnualPayRoutes = router;
