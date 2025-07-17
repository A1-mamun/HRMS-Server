import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { TDesignation } from './designation.interface';
import { Designation } from './designation.model';

const createDesignationToDB = async (
  deptData: TDesignation,
  organisationEmail: string,
) => {
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  const DesignationData = {
    ...deptData,
    organisation: user._id,
  };

  const newDesignation = await Designation.create(DesignationData);
  return newDesignation;
};

const updateDesignationToDB = async (
  id: string,
  deptData: Partial<TDesignation>,
) => {
  const updatedDesignation = await Designation.findByIdAndUpdate(id, deptData, {
    new: true,
    runValidators: true,
  });
  if (!updatedDesignation) {
    throw new AppError(httpStatus.NOT_FOUND, 'Designation not found');
  }
  return updatedDesignation;
};

const deleteDesignationFromDB = async (id: string) => {
  const deletedDesignation = await Designation.findByIdAndDelete(id);
  if (!deletedDesignation) {
    throw new AppError(httpStatus.NOT_FOUND, 'Designation not found');
  }
  return deletedDesignation;
};

export const DesignationServices = {
  createDesignationToDB,
  updateDesignationToDB,
  deleteDesignationFromDB,
};
