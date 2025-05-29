import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Express } from 'express';
import httpStatus from 'http-status';
import { EmployeeServices } from './employee.service';

const addEmployeeDocuments = catchAsync(async (req, res) => {
  const files = (
    Array.isArray(req.files) ? req.files : []
  ) as Express.Multer.File[];

  const { credentials, employeeData } = req.body;

  const result = await EmployeeServices.addEmployeeDocumentsToDB(
    files,
    credentials,
    employeeData,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Employee data added successfully',
    data: result,
  });
});

export const EmployeeControllers = {
  addEmployeeDocuments,
};
