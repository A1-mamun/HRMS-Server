import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { TaxMasterServices } from './taxMaster.service';

const createTaxMaster = catchAsync(async (req, res) => {
  const taxMasterData = req.body;
  const organisationEmail = req.user.email;

  const result = await TaxMasterServices.createTaxMasterToDB(
    taxMasterData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Tax created successfully',
    data: result,
  });
});

const getAllTaxMasters = catchAsync(async (req, res) => {
  const organisationEmail = req.user.email;

  const result =
    await TaxMasterServices.getAllTaxMastersFromDB(organisationEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Taxs retrieved successfully',
    data: result,
  });
});

const updateTaxMaster = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deptData = req.body;

  const result = await TaxMasterServices.updateTaxMasterToDB(id, deptData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tax updated successfully',
    data: result,
  });
});

const deleteTaxMaster = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await TaxMasterServices.deleteTaxMasterFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tax deleted successfully',
    data: result,
  });
});

export const TaxMasterControllers = {
  createTaxMaster,
  updateTaxMaster,
  deleteTaxMaster,
  getAllTaxMasters,
};
