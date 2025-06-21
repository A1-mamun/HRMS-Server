import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EmployerServices } from './employer.service';
import { Express } from 'express';
import httpStatus from 'http-status';

const addOrgDocuments = catchAsync(async (req, res) => {
  const files = (
    Array.isArray(req.files) ? req.files : []
  ) as Express.Multer.File[];

  const { credentials, employerData } = req.body;

  const result = await EmployerServices.addOrgDocumentsToDB(
    files,
    credentials,
    employerData,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Organization registered successfully',
    data: result,
  });
});

const getAllOrganisations = catchAsync(async (req, res) => {
  const result = await EmployerServices.getAllOrganisationsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Organisation employees retrived succesfully',
    meta: result.meta,
    data: result.result,
  });
});

export const EmployerControllers = {
  addOrgDocuments,
  getAllOrganisations,
};
