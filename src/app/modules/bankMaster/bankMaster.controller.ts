import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { BankMasterServices } from './bankMaster.service';

const createBankMaster = catchAsync(async (req, res) => {
  const { deptData } = req.body;
  const organisationEmail = req.user.email;

  const result = await BankMasterServices.createBankMasterToDB(
    deptData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'BankMaster created successfully',
    data: result,
  });
});

const updateBankMaster = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deptData = req.body;

  const result = await BankMasterServices.updateBankMasterToDB(id, deptData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BankMaster updated successfully',
    data: result,
  });
});

const deleteBankMaster = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BankMasterServices.deleteBankMasterFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BankMaster deleted successfully',
    data: result,
  });
});

export const BankMasterControllers = {
  createBankMaster,
  updateBankMaster,
  deleteBankMaster,
};
