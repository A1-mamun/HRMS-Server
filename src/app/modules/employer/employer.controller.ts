import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EmployerServices } from './employer.service';
import { Express } from 'express';
import httpStatus from 'http-status';

const createOrganisation = catchAsync(async (req, res) => {
  const files = (
    Array.isArray(req.files) ? req.files : []
  ) as Express.Multer.File[];

  const { credentials, employerData } = req.body;

  const result = await EmployerServices.createOrgainsationToDB(
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
    message: 'Organisations retrived succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOrganisation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EmployerServices.getSingleOrganisationFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Organisation retrieved successfully',
    data: result,
  });
});

const updateOrganisation = catchAsync(async (req, res) => {
  const files = (
    Array.isArray(req.files) ? req.files : []
  ) as Express.Multer.File[];
  const { employerData } = req.body;
  const { id } = req.params;
  const result = await EmployerServices.updateOrganisationToDB(
    id,
    files,
    employerData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Organisation updated successfully',
    data: result,
  });
});

export const EmployerControllers = {
  createOrganisation,
  getAllOrganisations,
  getSingleOrganisation,
  updateOrganisation,
};
