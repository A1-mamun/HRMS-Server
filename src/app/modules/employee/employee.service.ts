/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import { sendImagesToCloudinary } from '../../utils/sendImageToCloudinary';
import { TUser } from '../user/user.interface';
import { TEmployee } from './employee.interface';
import { Employee } from './employee.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Employer } from '../employer/employer.model';

// import { Employer } from './employer.model';

const createEmployeeToDB = async (
  files: any[],
  credentials: { email: string; password: string },
  employeeData: TEmployee,
  organisationEmail: string,
) => {
  // create a user object
  const userData: Partial<TUser> = {};
  userData.email = credentials.email;
  userData.password = credentials.password;
  userData.role = 'employee';

  // create a file map object to hold file URLs
  const fileMap: Record<string, string> = {};

  // console.log('File Map:', fileMap);

  // console.log('Updated Data:', updatedData);

  // Map file URLs into correct nested paths
  const replaceInPath = (pathArray: string[], url: string) => {
    let ref: any = employeeData;
    for (let i = 0; i < pathArray.length - 1; i++) {
      ref = ref[pathArray[i]];
    }
    ref[pathArray[pathArray.length - 1]] = url;
  };

  // update array object fields with file URLs
  const updateArrayObjectFields = (
    data: any,
    fileMap: Record<string, string>,
    arrayField: string,
  ) => {
    Object.entries(fileMap).forEach(([fieldKey, fileUrl]) => {
      const match = fieldKey.match(
        new RegExp(`^${arrayField}\\.(\\d+)\\.(\\w+)$`),
      );
      if (match) {
        const [, indexStr, prop] = match;
        const index = parseInt(indexStr);
        if (data[arrayField] && data[arrayField][index]) {
          data[arrayField][index][prop] = fileUrl;
        }
      }
    });
  };

  // create a mapping of field names to their nested paths in the employeeData object
  const fieldMapping: Record<string, string[]> = {
    profilePicture: ['serviceDetails', 'profilePicture'],
    proofOfAddress: ['contactInfo', 'proofOfAddress'],
    passportDocument: ['passportDetails', 'document'],
    visaDocumentFrontSide: ['visaDetails', 'frontsideDocument'],
    visaDocumentBackSide: ['visaDetails', 'backsideDocument'],
    eussDocument: ['eussDetails', 'document'],
    dbsDocument: ['dbsDetails', 'document'],
    nationalIdDocument: ['nationalIdDetails', 'document'],
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create user in the database
    const newUser = await User.create([userData], { session });

    if (!newUser || newUser.length === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // Upload files to Cloudinary
    if (files) {
      const filesToUpload = files.map((file) => ({
        imageName: `employee_${file.fieldname}_${Date.now()}`,
        path: file.path,
      }));

      const uploadedFiles = await sendImagesToCloudinary(filesToUpload);
      uploadedFiles.forEach((img, idx) => {
        fileMap[files[idx].fieldname] = img.secure_url as string;
      });
    }

    // Replace file objects in `data` with their Cloudinary URLs
    for (const field in fieldMapping) {
      if (fileMap[field]) {
        replaceInPath(fieldMapping[field], fileMap[field]);
      }
    }

    // update array object fields with file URLs
    updateArrayObjectFields(employeeData, fileMap, 'educationalDetails');
    updateArrayObjectFields(employeeData, fileMap, 'otherDetails');

    // set user reference in employeeData
    employeeData.user = newUser[0]._id;

    // set organisation reference in employeeData
    const organisationUser = await User.findOne({ email: organisationEmail });
    if (!organisationUser) {
      throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
    }
    employeeData.organisation = organisationUser._id;

    // Create employee in the database
    const newEmployee = await Employee.create([employeeData], { session });

    if (!newEmployee || newEmployee.length === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create employee');
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    return newEmployee;
  } catch (err: any) {
    // Rollback the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    throw new Error(err);
  }
};

const updateEmployeeToDB = async (
  id: string,
  files: any[],
  employeeData: TEmployee,
) => {
  const fileMap: Record<string, string> = {};

  // Map file URLs into correct nested paths
  const replaceInPath = (pathArray: string[], url: string) => {
    let ref: any = employeeData;
    for (let i = 0; i < pathArray.length - 1; i++) {
      ref = ref[pathArray[i]];
    }
    ref[pathArray[pathArray.length - 1]] = url;
  };

  // update array object fields with file URLs
  const updateArrayObjectFields = (
    data: any,
    fileMap: Record<string, string>,
    arrayField: string,
  ) => {
    Object.entries(fileMap).forEach(([fieldKey, fileUrl]) => {
      const match = fieldKey.match(
        new RegExp(`^${arrayField}\\.(\\d+)\\.(\\w+)$`),
      );
      if (match) {
        const [, indexStr, prop] = match;
        const index = parseInt(indexStr);
        if (data[arrayField] && data[arrayField][index]) {
          data[arrayField][index][prop] = fileUrl;
        }
      }
    });
  };

  // create a mapping of field names to their nested paths in the employeeData object
  const fieldMapping: Record<string, string[]> = {
    profilePicture: ['serviceDetails', 'profilePicture'],
    proofOfAddress: ['contactInfo', 'proofOfAddress'],
    passportDocument: ['passportDetails', 'document'],
    visaDocumentFrontSide: ['visaDetails', 'frontsideDocument'],
    visaDocumentBackSide: ['visaDetails', 'backsideDocument'],
    eussDocument: ['eussDetails', 'document'],
    dbsDocument: ['dbsDetails', 'document'],
    nationalIdDocument: ['nationalIdDetails', 'document'],
  };

  // Upload files to Cloudinary
  if (files) {
    const filesToUpload = files.map((file) => ({
      imageName: `employee_${file.fieldname}_${Date.now()}`,
      path: file.path,
    }));

    const uploadedFiles = await sendImagesToCloudinary(filesToUpload);

    uploadedFiles.forEach((img, idx) => {
      fileMap[files[idx].fieldname] = img.secure_url as string;
    });
  }

  // Replace file objects in `data` with their Cloudinary URLs
  for (const field in fieldMapping) {
    if (fileMap[field]) {
      replaceInPath(fieldMapping[field], fileMap[field]);
    }
  }

  // update array object fields with file URLs
  updateArrayObjectFields(employeeData, fileMap, 'educationalDetails');
  updateArrayObjectFields(employeeData, fileMap, 'otherDetails');

  // set user reference in employeeData
  const employee = await Employee.findById(id);
  if (!employee) {
    throw new AppError(httpStatus.NOT_FOUND, 'Employee not found');
  }

  employeeData.user = employee.user;
  employeeData.organisation = employee.organisation;

  const updatedEmployee = await Employee.findByIdAndUpdate(id, employeeData, {
    new: true,
    runValidators: true,
  });

  if (!updatedEmployee) {
    throw new AppError(httpStatus.NOT_FOUND, 'Employee not found');
  }
  return updatedEmployee;
};

const getOrganisationEmployeesFromDB = async (
  organisationEmail: string,
  query: Record<string, unknown>,
) => {
  const user = await User.findOne({ email: organisationEmail });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const organisation = await Employer.findOne({ user: user._id });

  if (!organisation) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found !');
  }

  const organisationEmployeeQuery = new QueryBuilder(
    Employee.find({ organisation: user._id }),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const employees = await organisationEmployeeQuery.modelQuery;
  const meta = await organisationEmployeeQuery.countTotal();

  return {
    meta,
    result: { employees, organisation },
  };
};

const getSingleEmployeeFromDB = async (id: string) => {
  const result = await Employee.findById(id);
  return result;
};

export const EmployeeServices = {
  createEmployeeToDB,
  getOrganisationEmployeesFromDB,
  getSingleEmployeeFromDB,
  updateEmployeeToDB,
};
