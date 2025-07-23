import { Router } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import { BankSortcodeValidation } from './bankSortcode.validation';
import validateRequest from '../../middlewares/validateRequest';
import { BankSortcodeControllers } from './bankSortcode.controller';

const router = Router();

router.post(
  '/create-BankSortcode',
  auth(USER_ROLE.employer),
  validateRequest(BankSortcodeValidation.BankSortcodeSchema),
  BankSortcodeControllers.createBankSortcode,
);

router.get(
  '/bankSortcodes',
  auth(USER_ROLE.employer),
  validateRequest(BankSortcodeValidation.BankSortcodeSchema),
  BankSortcodeControllers.getAllBankSortcodes,
);

router.patch(
  '/:id',
  auth(USER_ROLE.employer),
  validateRequest(BankSortcodeValidation.BankSortcodeSchema),
  BankSortcodeControllers.updateBankSortcode,
);

router.delete(
  '/:id',
  auth(USER_ROLE.employer),
  BankSortcodeControllers.deleteBankSortcode,
);

export const BankSortcodeRoutes = router;
