import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { PayGroupServices } from './payGroup.service';

const createPayGroup = catchAsync(async (req, res) => {
  const { deptData } = req.body;
  const organisationEmail = req.user.email;

  const result = await PayGroupServices.createPayGroupToDB(
    deptData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'PayGroup created successfully',
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
    message: 'PayGroup updated successfully',
    data: result,
  });
});

const deletePayGroup = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await PayGroupServices.deletePayGroupFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PayGroup deleted successfully',
    data: result,
  });
});

export const PayGroupControllers = {
  createPayGroup,
  updatePayGroup,
  deletePayGroup,
};
