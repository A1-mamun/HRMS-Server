import { NextFunction, Request, Response, Router } from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
// import { EmployeeValidations } from './employee.validation';
import { EmployeeControllers } from './employee.controller';
import validateRequest from '../../middlewares/validateRequest';
import { EmployeeValidations } from './employee.validation';

const router = Router();

router.post(
  '/add-employee-documents',
  auth(USER_ROLE.employee),
  upload.any(),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(EmployeeValidations.employeeValidationSchema),
  EmployeeControllers.addEmployeeDocuments,
);

export const EmployeeRoutes = router;
