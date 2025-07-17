import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TPayGroup } from './payGroup.interface';
import { PayGroup } from './payGroup.model';
import httpStatus from 'http-status';

const createPayGroupToDB = async (
  deptData: TPayGroup,
  organisationEmail: string,
) => {
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  const PayGroupData = {
    ...deptData,
    organisation: user._id,
  };

  const newPayGroup = await PayGroup.create(PayGroupData);
  return newPayGroup;
};

const updatePayGroupToDB = async (id: string, deptData: Partial<TPayGroup>) => {
  const updatedPayGroup = await PayGroup.findByIdAndUpdate(id, deptData, {
    new: true,
    runValidators: true,
  });
  if (!updatedPayGroup) {
    throw new AppError(httpStatus.NOT_FOUND, 'PayGroup not found');
  }
  return updatedPayGroup;
};

const deletePayGroupFromDB = async (id: string) => {
  const deletedPayGroup = await PayGroup.findByIdAndDelete(id);
  if (!deletedPayGroup) {
    throw new AppError(httpStatus.NOT_FOUND, 'PayGroup not found');
  }
  return deletedPayGroup;
};

export const PayGroupServices = {
  createPayGroupToDB,
  updatePayGroupToDB,
  deletePayGroupFromDB,
};
