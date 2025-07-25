import { Router } from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import { PaymentTypeValidation } from './paymentType.validation';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentTypeControllers } from './paymentType.controller';

const router = Router();

router.post(
  '/create-payment-type',
  auth(USER_ROLE.employer),
  validateRequest(PaymentTypeValidation.PaymentTypeSchema),
  PaymentTypeControllers.createPaymentType,
);

router.get(
  '/payment-types',
  auth(USER_ROLE.employer),
  PaymentTypeControllers.getAllPaymentTypes,
);

router.patch(
  '/:id',
  auth(USER_ROLE.employer),
  validateRequest(PaymentTypeValidation.PaymentTypeSchema),
  PaymentTypeControllers.updatePaymentType,
);

router.delete(
  '/:id',
  auth(USER_ROLE.employer),
  PaymentTypeControllers.deletePaymentType,
);

export const PaymentTypeRoutes = router;
