import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { TEmploymentType } from './employmentType.interface';
import { EmploymentType } from './employmentType.model';

const createEmploymentTypeToDB = async (
  deptData: TEmploymentType,
  organisationEmail: string,
) => {
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  const EmploymentTypeData = {
    ...deptData,
    organisation: user._id,
  };

  const newEmploymentType = await EmploymentType.create(EmploymentTypeData);
  return newEmploymentType;
};

const updateEmploymentTypeToDB = async (
  id: string,
  deptData: Partial<TEmploymentType>,
) => {
  const updatedEmploymentType = await EmploymentType.findByIdAndUpdate(
    id,
    deptData,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!updatedEmploymentType) {
    throw new AppError(httpStatus.NOT_FOUND, 'EmploymentType not found');
  }
  return updatedEmploymentType;
};

const deleteEmploymentTypeFromDB = async (id: string) => {
  const deletedEmploymentType = await EmploymentType.findByIdAndDelete(id);
  if (!deletedEmploymentType) {
    throw new AppError(httpStatus.NOT_FOUND, 'EmploymentType not found');
  }
  return deletedEmploymentType;
};

export const EmploymentTypeServices = {
  createEmploymentTypeToDB,
  updateEmploymentTypeToDB,
  deleteEmploymentTypeFromDB,
};
