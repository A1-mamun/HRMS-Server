import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { DesignationServices } from './designation.service';

const createDesignation = catchAsync(async (req, res) => {
  const designationData = req.body;
  const organisationEmail = req.user.email;

  const result = await DesignationServices.createDesignationToDB(
    designationData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Designation created successfully',
    data: result,
  });
});

const updateDesignation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deptData = req.body;

  const result = await DesignationServices.updateDesignationToDB(id, deptData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Designation updated successfully',
    data: result,
  });
});

const deleteDesignation = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await DesignationServices.deleteDesignationFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Designation deleted successfully',
    data: result,
  });
});

export const DesignationControllers = {
  createDesignation,
  updateDesignation,
  deleteDesignation,
};
