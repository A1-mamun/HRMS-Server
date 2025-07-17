import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TPaymentType } from './paymentType.interface';
import { PaymentType } from './paymentType.model';
import httpStatus from 'http-status';

const createPaymentTypeToDB = async (
  deptData: TPaymentType,
  organisationEmail: string,
) => {
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  const PaymentTypeData = {
    ...deptData,
    organisation: user._id,
  };

  const newPaymentType = await PaymentType.create(PaymentTypeData);
  return newPaymentType;
};

const updatePaymentTypeToDB = async (
  id: string,
  deptData: Partial<TPaymentType>,
) => {
  const updatedPaymentType = await PaymentType.findByIdAndUpdate(id, deptData, {
    new: true,
    runValidators: true,
  });
  if (!updatedPaymentType) {
    throw new AppError(httpStatus.NOT_FOUND, 'PaymentType not found');
  }
  return updatedPaymentType;
};

const deletePaymentTypeFromDB = async (id: string) => {
  const deletedPaymentType = await PaymentType.findByIdAndDelete(id);
  if (!deletedPaymentType) {
    throw new AppError(httpStatus.NOT_FOUND, 'PaymentType not found');
  }
  return deletedPaymentType;
};

export const PaymentTypeServices = {
  createPaymentTypeToDB,
  updatePaymentTypeToDB,
  deletePaymentTypeFromDB,
};
