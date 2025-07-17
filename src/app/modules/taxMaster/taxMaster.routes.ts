import { Router } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import { TaxMasterValidation } from './taxMaster.validation';
import validateRequest from '../../middlewares/validateRequest';
import { TaxMasterControllers } from './taxMaster.controller';

const router = Router();

router.post(
  '/create-TaxMaster',
  auth(USER_ROLE.employer),
  validateRequest(TaxMasterValidation.TaxMasterSchema),
  TaxMasterControllers.createTaxMaster,
);

router.patch(
  '/:id',
  auth(USER_ROLE.employer),
  validateRequest(TaxMasterValidation.TaxMasterSchema),
  TaxMasterControllers.updateTaxMaster,
);

router.delete(
  '/:id',
  auth(USER_ROLE.employer),
  TaxMasterControllers.deleteTaxMaster,
);

export const TaxMasterRoutes = router;
