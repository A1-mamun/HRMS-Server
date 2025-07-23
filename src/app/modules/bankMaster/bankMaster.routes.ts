import { Router } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

import validateRequest from '../../middlewares/validateRequest';
import { BankMasterValidation } from './bankMaster.validation';
import { BankMasterControllers } from './bankMaster.controller';

const router = Router();

router.post(
  '/create-bank',
  auth(USER_ROLE.employer),
  validateRequest(BankMasterValidation.BankMasterSchema),
  BankMasterControllers.createBankMaster,
);

router.get(
  '/banks',
  auth(USER_ROLE.employer),
  validateRequest(BankMasterValidation.BankMasterSchema),
  BankMasterControllers.getAllBankMasters,
);

router.patch(
  '/:id',
  auth(USER_ROLE.employer),
  validateRequest(BankMasterValidation.BankMasterSchema),
  BankMasterControllers.updateBankMaster,
);

router.delete(
  '/:id',
  auth(USER_ROLE.employer),
  BankMasterControllers.deleteBankMaster,
);

export const BankMasterRoutes = router;
