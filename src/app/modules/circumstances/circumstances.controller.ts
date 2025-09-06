import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Express } from 'express';
import httpStatus from 'http-status';
import { CircumstancesService } from './circumstances.service';

const createCircumstances = catchAsync(async (req, res) => {
  const files = (
    Array.isArray(req.files) ? req.files : []
  ) as Express.Multer.File[];

  const { employeeId, circumstancesData } = req.body;
  const organisationEmail = req.user.email;

  const result = await CircumstancesService.createCircumstancesToDB(
    files,
    employeeId,
    circumstancesData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Employee data added successfully',
    data: result,
  });
});

export const CircumstancesController = {
  createCircumstances,
};
