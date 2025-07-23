import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBankMaster } from './bankMaster.interface';
import { BankMaster } from './bankMaster.model';
import httpStatus from 'http-status';

const createBankMasterToDB = async (
  deptData: TBankMaster,
  organisationEmail: string,
) => {
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  const BankMasterData = {
    ...deptData,
    organisation: user._id,
  };

  const newBankMaster = await BankMaster.create(BankMasterData);
  return newBankMaster;
};

const getAllBankMastersFromDB = async (organisationEmail: string) => {
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  const bankMasters = await BankMaster.find({ organisation: user._id });
  return bankMasters;
};

const updateBankMasterToDB = async (
  id: string,
  deptData: Partial<TBankMaster>,
) => {
  const updatedBankMaster = await BankMaster.findByIdAndUpdate(id, deptData, {
    new: true,
    runValidators: true,
  });
  if (!updatedBankMaster) {
    throw new AppError(httpStatus.NOT_FOUND, 'BankMaster not found');
  }
  return updatedBankMaster;
};

const deleteBankMasterFromDB = async (id: string) => {
  const deletedBankMaster = await BankMaster.findByIdAndDelete(id);
  if (!deletedBankMaster) {
    throw new AppError(httpStatus.NOT_FOUND, 'BankMaster not found');
  }
  return deletedBankMaster;
};

export const BankMasterServices = {
  createBankMasterToDB,
  updateBankMasterToDB,
  deleteBankMasterFromDB,
  getAllBankMastersFromDB,
};
