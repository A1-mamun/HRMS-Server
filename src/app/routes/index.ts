import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { EmployerRoutes } from '../modules/employer/employer.routes';
import { EmployeeRoutes } from '../modules/employee/employee.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/employer',
    route: EmployerRoutes,
  },
  {
    path: '/employee',
    route: EmployeeRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
