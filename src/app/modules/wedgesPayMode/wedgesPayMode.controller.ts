import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { WedgesPayModeServices } from './wedgesPayMode.service';

const createWedgesPayMode = catchAsync(async (req, res) => {
  const wedgesPayModeData = req.body;
  const organisationEmail = req.user.email;

  const result = await WedgesPayModeServices.createWedgesPayModeToDB(
    wedgesPayModeData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Wedges Pay Mode created successfully',
    data: result,
  });
});

const getAllWedgesPayModes = catchAsync(async (req, res) => {
  const organisationEmail = req.user.email;

  const result =
    await WedgesPayModeServices.getAllWedgesPayModesFromDB(organisationEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wedges Pay Modes retrieved successfully',
    data: result,
  });
});

const updateWedgesPayMode = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deptData = req.body;

  const result = await WedgesPayModeServices.updateWedgesPayModeToDB(
    id,
    deptData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wedges Pay Mode updated successfully',
    data: result,
  });
});

const deleteWedgesPayMode = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await WedgesPayModeServices.deleteWedgesPayModeFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wedges Pay Mode deleted successfully',
    data: result,
  });
});

export const WedgesPayModeControllers = {
  createWedgesPayMode,
  updateWedgesPayMode,
  deleteWedgesPayMode,
  getAllWedgesPayModes,
};
