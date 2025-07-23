import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { PaymentTypeServices } from './paymentType.service';

const createPaymentType = catchAsync(async (req, res) => {
  const paymentTypeData = req.body;
  const organisationEmail = req.user.email;

  const result = await PaymentTypeServices.createPaymentTypeToDB(
    paymentTypeData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Payment Type created successfully',
    data: result,
  });
});

const getAllPaymentTypes = catchAsync(async (req, res) => {
  const organisationEmail = req.user.email;

  const result =
    await PaymentTypeServices.getAllPaymentTypesFromDB(organisationEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Types retrieved successfully',
    data: result,
  });
});

const updatePaymentType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deptData = req.body;

  const result = await PaymentTypeServices.updatePaymentTypeToDB(id, deptData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Type updated successfully',
    data: result,
  });
});

const deletePaymentType = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await PaymentTypeServices.deletePaymentTypeFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Type deleted successfully',
    data: result,
  });
});

export const PaymentTypeControllers = {
  createPaymentType,
  updatePaymentType,
  deletePaymentType,
  getAllPaymentTypes,
};
