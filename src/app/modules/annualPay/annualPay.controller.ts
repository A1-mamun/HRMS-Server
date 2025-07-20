import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AnnualPayServices } from './annualPay.service';

const createAnnualPay = catchAsync(async (req, res) => {
  const annualPayData = req.body;
  const organisationEmail = req.user.email;

  const result = await AnnualPayServices.createAnnualPayToDB(
    annualPayData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'AnnualPay created successfully',
    data: result,
  });
});

const updateAnnualPay = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deptData = req.body;

  const result = await AnnualPayServices.updateAnnualPayToDB(id, deptData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AnnualPay updated successfully',
    data: result,
  });
});

const deleteAnnualPay = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AnnualPayServices.deleteAnnualPayFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AnnualPay deleted successfully',
    data: result,
  });
});

export const AnnualPayControllers = {
  createAnnualPay,
  updateAnnualPay,
  deleteAnnualPay,
};
