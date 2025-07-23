import { Router } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

import validateRequest from '../../middlewares/validateRequest';
import { BankMasterValidation } from './bankMaster.validation';
import { BankMasterControllers } from './bankMaster.controller';

const router = Router();

router.post(
  '/create-bank-master',
  auth(USER_ROLE.employer),
  validateRequest(BankMasterValidation.BankMasterSchema),
  BankMasterControllers.createBankMaster,
);

router.get(
  '/bank-masters',
  auth(USER_ROLE.employer),
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
