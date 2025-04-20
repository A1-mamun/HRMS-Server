import { NextFunction, Request, Response, Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { EmployeeValidations } from './employee.validation';
import { EmployeeControllers } from './employee.controller';

const router = Router();

router.post(
  '/add-org-documents',
  auth(USER_ROLE.employer),
  upload.any(),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(EmployeeValidations.employeeValidationSchema),
  EmployeeControllers.addEmployeeDocuments,
);

export const EmployeeRoutes = router;
