import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { BankSortcodeServices } from './bankSortcode.service';

const createBankSortcode = catchAsync(async (req, res) => {
  const bankSortcodeData = req.body;
  const organisationEmail = req.user.email;

  const result = await BankSortcodeServices.createBankSortcodeToDB(
    bankSortcodeData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Bank Sort code created successfully',
    data: result,
  });
});

const getAllBankSortcodes = catchAsync(async (req, res) => {
  const organisationEmail = req.user.email;

  const result =
    await BankSortcodeServices.getAllBankSortcodesFromDB(organisationEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bank Sort codes retrieved successfully',
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
    message: 'Bank Sort code updated successfully',
    data: result,
  });
});

const deleteBankSortcode = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BankSortcodeServices.deleteBankSortcodeFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bank Sort code deleted successfully',
    data: result,
  });
});

export const BankSortcodeControllers = {
  createBankSortcode,
  updateBankSortcode,
  deleteBankSortcode,
  getAllBankSortcodes,
};
