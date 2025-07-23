import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { EmploymentTypeServices } from './employmentType.service';

const createEmploymentType = catchAsync(async (req, res) => {
  const employmentTypeData = req.body;
  const organisationEmail = req.user.email;

  const result = await EmploymentTypeServices.createEmploymentTypeToDB(
    employmentTypeData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Employment Type created successfully',
    data: result,
  });
});

const getAllEmploymentTypes = catchAsync(async (req, res) => {
  const organisationEmail = req.user.email;

  const result =
    await EmploymentTypeServices.getAllEmploymentTypesFromDB(organisationEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employment Types retrieved successfully',
    data: result,
  });
});

const updateEmploymentType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deptData = req.body;

  const result = await EmploymentTypeServices.updateEmploymentTypeToDB(
    id,
    deptData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employment Type updated successfully',
    data: result,
  });
});

const deleteEmploymentType = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await EmploymentTypeServices.deleteEmploymentTypeFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employment Type deleted successfully',
    data: result,
  });
});

export const EmploymentTypeControllers = {
  createEmploymentType,
  updateEmploymentType,
  deleteEmploymentType,
  getAllEmploymentTypes,
};
