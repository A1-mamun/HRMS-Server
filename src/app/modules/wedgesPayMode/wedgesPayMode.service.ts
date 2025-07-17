import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TWedgesPayMode } from './wedgesPayMode.interface';
import { WedgesPayMode } from './wedgesPayMode.model';
import httpStatus from 'http-status';

const createWedgesPayModeToDB = async (
  deptData: TWedgesPayMode,
  organisationEmail: string,
) => {
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  const WedgesPayModeData = {
    ...deptData,
    organisation: user._id,
  };

  const newWedgesPayMode = await WedgesPayMode.create(WedgesPayModeData);
  return newWedgesPayMode;
};

const updateWedgesPayModeToDB = async (
  id: string,
  deptData: Partial<TWedgesPayMode>,
) => {
  const updatedWedgesPayMode = await WedgesPayMode.findByIdAndUpdate(
    id,
    deptData,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!updatedWedgesPayMode) {
    throw new AppError(httpStatus.NOT_FOUND, 'WedgesPayMode not found');
  }
  return updatedWedgesPayMode;
};

const deleteWedgesPayModeFromDB = async (id: string) => {
  const deletedWedgesPayMode = await WedgesPayMode.findByIdAndDelete(id);
  if (!deletedWedgesPayMode) {
    throw new AppError(httpStatus.NOT_FOUND, 'WedgesPayMode not found');
  }
  return deletedWedgesPayMode;
};

export const WedgesPayModeServices = {
  createWedgesPayModeToDB,
  updateWedgesPayModeToDB,
  deleteWedgesPayModeFromDB,
};
