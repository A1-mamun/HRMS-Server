import { NextFunction, Request, Response, Router } from 'express';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { upload } from '../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validateRequest';
import { CircumstancesValidations } from './circumstances.validation';
import { CircumstancesController } from './circumstances.controller';

const router = Router();

router.post(
  '/create-circumstances',
  auth(USER_ROLE.employer),
  upload.any(),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(CircumstancesValidations.circumstancesValidationSchema),
  CircumstancesController.createCircumstances,
);

export const CircumstancesRoutes = router;
