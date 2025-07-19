import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TDepartment } from './department.interface';
import { Department } from './department.model';
import httpStatus from 'http-status';

const createDepartmentToDB = async (
  deptData: TDepartment,
  organisationEmail: string,
) => {
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  const departmentData = {
    ...deptData,
    organisation: user._id,
  };

  const newDepartment = await Department.create(departmentData);
  return newDepartment;
};

const updateDepartmentToDB = async (
  id: string,
  deptData: Partial<TDepartment>,
) => {
  const updatedDepartment = await Department.findByIdAndUpdate(id, deptData, {
    new: true,
    runValidators: true,
  });
  if (!updatedDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department not found');
  }
  return updatedDepartment;
};

const deleteDepartmentFromDB = async (id: string) => {
  const deletedDepartment = await Department.findByIdAndDelete(id);
  if (!deletedDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department not found');
  }
  return deletedDepartment;
};

export const DepartmentServices = {
  createDepartmentToDB,
  updateDepartmentToDB,
  deleteDepartmentFromDB,
};
