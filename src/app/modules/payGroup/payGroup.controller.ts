import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { PayGroupServices } from './payGroup.service';

const createPayGroup = catchAsync(async (req, res) => {
  const payGroupData = req.body;
  const organisationEmail = req.user.email;

  const result = await PayGroupServices.createPayGroupToDB(
    payGroupData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Pay Group created successfully',
    data: result,
  });
});

const getAllPayGroups = catchAsync(async (req, res) => {
  const organisationEmail = req.user.email;

  const result =
    await PayGroupServices.getAllPayGroupsFromDB(organisationEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pay Groups retrieved successfully',
    data: result,
  });
});

const updatePayGroup = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deptData = req.body;

  const result = await PayGroupServices.updatePayGroupToDB(id, deptData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pay Group updated successfully',
    data: result,
  });
});

const deletePayGroup = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await PayGroupServices.deletePayGroupFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pay Group deleted successfully',
    data: result,
  });
});

export const PayGroupControllers = {
  createPayGroup,
  updatePayGroup,
  deletePayGroup,
  getAllPayGroups,
};
