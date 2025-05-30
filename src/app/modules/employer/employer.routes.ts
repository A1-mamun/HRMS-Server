import { NextFunction, Request, Response, Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EmployerValidations } from './employer.validation';
import { upload } from '../../utils/sendImageToCloudinary';
import { EmployerControllers } from './employer.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-organisation',
  auth(USER_ROLE.admin),
  upload.any(),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(EmployerValidations.employerValidationSchema),
  EmployerControllers.addOrgDocuments,
);

export const EmployerRoutes = router;
