import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBankSortcode } from './bankSortcode.interface';
import { BankSortcode } from './bankSortcode.model';
import httpStatus from 'http-status';

const createBankSortcodeToDB = async (
  deptData: TBankSortcode,
  organisationEmail: string,
) => {
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  const BankSortcodeData = {
    ...deptData,
    organisation: user._id,
  };

  const newBankSortcode = await BankSortcode.create(BankSortcodeData);
  return newBankSortcode;
};

const getAllBankSortcodesFromDB = async (organisationEmail: string) => {
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  const bankSortcodes = await BankSortcode.find({ organisation: user._id });
  return bankSortcodes;
};

const updateBankSortcodeToDB = async (
  id: string,
  deptData: Partial<TBankSortcode>,
) => {
  const updatedBankSortcode = await BankSortcode.findByIdAndUpdate(
    id,
    deptData,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!updatedBankSortcode) {
    throw new AppError(httpStatus.NOT_FOUND, 'BankSortcode not found');
  }
  return updatedBankSortcode;
};

const deleteBankSortcodeFromDB = async (id: string) => {
  const deletedBankSortcode = await BankSortcode.findByIdAndDelete(id);
  if (!deletedBankSortcode) {
    throw new AppError(httpStatus.NOT_FOUND, 'BankSortcode not found');
  }
  return deletedBankSortcode;
};

export const BankSortcodeServices = {
  createBankSortcodeToDB,
  updateBankSortcodeToDB,
  deleteBankSortcodeFromDB,
  getAllBankSortcodesFromDB,
};
