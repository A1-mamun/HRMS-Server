import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Express } from 'express';
import httpStatus from 'http-status';
import { EmployeeServices } from './employee.service';

const createEmployee = catchAsync(async (req, res) => {
  const files = (
    Array.isArray(req.files) ? req.files : []
  ) as Express.Multer.File[];

  const { credentials, employeeData } = req.body;
  const organisationEmail = req.user.email;

  const result = await EmployeeServices.createEmployeeToDB(
    files,
    credentials,
    employeeData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Employee data added successfully',
    data: result,
  });
});

const updateEmployee = catchAsync(async (req, res) => {
  const files = (
    Array.isArray(req.files) ? req.files : []
  ) as Express.Multer.File[];
  const { employeeData } = req.body;
  const { id } = req.params;

  const result = await EmployeeServices.updateEmployeeToDB(
    id,
    files,
    employeeData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee data updated successfully',
    data: result,
  });
});

const getOrganisationEmployees = catchAsync(async (req, res) => {
  const organisationEmail = req.user.email;

  const result = await EmployeeServices.getOrganisationEmployeesFromDB(
    organisationEmail,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Organisation employees retrived succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleEmployee = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EmployeeServices.getSingleEmployeeFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Employee retrieved successfully',
    data: result,
  });
});

export const EmployeeControllers = {
  createEmployee,
  getOrganisationEmployees,
  getSingleEmployee,
  updateEmployee,
};
