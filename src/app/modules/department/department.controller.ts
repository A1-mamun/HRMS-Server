import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { DepartmentServices } from './department.service';

const createDepartment = catchAsync(async (req, res) => {
  const deptData = req.body;
  const organisationEmail = req.user.email;

  const result = await DepartmentServices.createDepartmentToDB(
    deptData,
    organisationEmail,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Department created successfully',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req, res) => {
  const organisationEmail = req.user.email;

  const result =
    await DepartmentServices.getAllDepartmentsFromDB(organisationEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Departments retrieved successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deptData = req.body;

  const result = await DepartmentServices.updateDepartmentToDB(id, deptData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department updated successfully',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await DepartmentServices.deleteDepartmentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department deleted successfully',
    data: result,
  });
});

export const DepartmentControllers = {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getAllDepartments,
};
