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
  '/create-employee',
  auth(USER_ROLE.employer),
  upload.any(),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(EmployeeValidations.employeeValidationSchema),
  EmployeeControllers.createEmployee,
);

router.get(
  '/organisation-employees',
  auth(USER_ROLE.employer),
  EmployeeControllers.getOrganisationEmployees,
);

router.get(
  '/:id',
  auth(USER_ROLE.employer),
  EmployeeControllers.getSingleEmployee,
);

export const EmployeeRoutes = router;
