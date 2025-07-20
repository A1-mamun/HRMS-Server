import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { EmployerRoutes } from '../modules/employer/employer.routes';
import { EmployeeRoutes } from '../modules/employee/employee.routes';
import { DepartmentRoutes } from '../modules/department/department.routes';
import { DesignationRoutes } from '../modules/designation/designation.routes';
import { AnnualPayRoutes } from '../modules/annualPay/annualPay.routes';
import { BankMasterRoutes } from '../modules/bankMaster/bankMaster.routes';
import { BankSortcodeRoutes } from '../modules/bankSortcode/bankSortcode.routes';
import { EmploymentTypeRoutes } from '../modules/employmentType/employmentType.routes';
import { PayGroupRoutes } from '../modules/payGroup/payGroup.routes';
import { PaymentTypeRoutes } from '../modules/paymentType/paymentType.routes';
import { TaxMasterRoutes } from '../modules/taxMaster/taxMaster.routes';
import { WedgesPayModeRoutes } from '../modules/wedgesPayMode/wedgesPayMode.routes';

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
  {
    path: '/department',
    route: DepartmentRoutes,
  },
  {
    path: '/designation',
    route: DesignationRoutes,
  },
  {
    path: '/annual-pay',
    route: AnnualPayRoutes,
  },
  {
    path: '/bank-master',
    route: BankMasterRoutes,
  },
  {
    path: '/bank-sort-code',
    route: BankSortcodeRoutes,
  },
  {
    path: '/employment-type',
    route: EmploymentTypeRoutes,
  },
  {
    path: '/pay-group',
    route: PayGroupRoutes,
  },
  {
    path: '/payment-type',
    route: PaymentTypeRoutes,
  },
  {
    path: '/tax-master',
    route: TaxMasterRoutes,
  },
  {
    path: '/wedges-pay-mode',
    route: WedgesPayModeRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
