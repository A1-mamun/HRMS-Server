/* eslint-disable @typescript-eslint/no-explicit-any */
// import { JwtPayload } from 'jsonwebtoken';

import mongoose from 'mongoose';
import { sendImagesToCloudinary } from '../../utils/sendImageToCloudinary';
import { TUser } from '../user/user.interface';
import { TEmployee } from './employee.interface';
import { Employee } from './employee.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// import { Employer } from './employer.model';

const addEmployeeDocumentsToDB = async (
  files: any[],
  credentials: { email: string; password: string },
  employeeData: TEmployee,
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
    proofOfAddress: ['contactiInfo', 'proofOfAddress'],
    passportDocument: ['pasportDetails', 'document'],
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
    const newUser = await Employee.create([userData], { session });

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

export const EmployeeServices = {
  addEmployeeDocumentsToDB,
};
