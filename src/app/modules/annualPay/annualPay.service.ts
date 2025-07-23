import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TAnnualPay } from './annualPay.interface';
import { AnnualPay } from './annualPay.model';
import httpStatus from 'http-status';

const createAnnualPayToDB = async (
  deptData: TAnnualPay,
  organisationEmail: string,
) => {
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  const AnnualPayData = {
    ...deptData,
    organisation: user._id,
  };

  const newAnnualPay = await AnnualPay.create(AnnualPayData);
  return newAnnualPay;
};

const getAllAnnualPaysFromDB = async (organisationEmail: string) => {
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  const annualPays = await AnnualPay.find({ organisation: user._id });
  return annualPays;
};

const updateAnnualPayToDB = async (
  id: string,
  deptData: Partial<TAnnualPay>,
) => {
  const updatedAnnualPay = await AnnualPay.findByIdAndUpdate(id, deptData, {
    new: true,
    runValidators: true,
  });
  if (!updatedAnnualPay) {
    throw new AppError(httpStatus.NOT_FOUND, 'AnnualPay not found');
  }
  return updatedAnnualPay;
};

const deleteAnnualPayFromDB = async (id: string) => {
  const deletedAnnualPay = await AnnualPay.findByIdAndDelete(id);
  if (!deletedAnnualPay) {
    throw new AppError(httpStatus.NOT_FOUND, 'AnnualPay not found');
  }
  return deletedAnnualPay;
};

export const AnnualPayServices = {
  createAnnualPayToDB,
  updateAnnualPayToDB,
  deleteAnnualPayFromDB,
  getAllAnnualPaysFromDB,
};
