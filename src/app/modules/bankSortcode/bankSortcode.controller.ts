import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { BankSortcodeServices } from './bankSortcode.service';

const createBankSortcode = catchAsync(async (req, res) => {
  const { deptData } = req.body;
  const organisationEmail = req.user.email;

  const result = await BankSortcodeServices.createBankSortcodeToDB(
    deptData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'BankSortcode created successfully',
    data: result,
  });
});

const updateBankSortcode = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deptData = req.body;

  const result = await BankSortcodeServices.updateBankSortcodeToDB(
    id,
    deptData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BankSortcode updated successfully',
    data: result,
  });
});

const deleteBankSortcode = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BankSortcodeServices.deleteBankSortcodeFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'BankSortcode deleted successfully',
    data: result,
  });
});

export const BankSortcodeControllers = {
  createBankSortcode,
  updateBankSortcode,
  deleteBankSortcode,
};
