import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TTaxMaster } from './taxMaster.interface';
import { TaxMaster } from './taxMaster.model';
import httpStatus from 'http-status';

const createTaxMasterToDB = async (
  deptData: TTaxMaster,
  organisationEmail: string,
) => {
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  const TaxMasterData = {
    ...deptData,
    organisation: user._id,
  };

  const newTaxMaster = await TaxMaster.create(TaxMasterData);
  return newTaxMaster;
};

const updateTaxMasterToDB = async (
  id: string,
  deptData: Partial<TTaxMaster>,
) => {
  const updatedTaxMaster = await TaxMaster.findByIdAndUpdate(id, deptData, {
    new: true,
    runValidators: true,
  });
  if (!updatedTaxMaster) {
    throw new AppError(httpStatus.NOT_FOUND, 'TaxMaster not found');
  }
  return updatedTaxMaster;
};

const deleteTaxMasterFromDB = async (id: string) => {
  const deletedTaxMaster = await TaxMaster.findByIdAndDelete(id);
  if (!deletedTaxMaster) {
    throw new AppError(httpStatus.NOT_FOUND, 'TaxMaster not found');
  }
  return deletedTaxMaster;
};

export const TaxMasterServices = {
  createTaxMasterToDB,
  updateTaxMasterToDB,
  deleteTaxMasterFromDB,
};
