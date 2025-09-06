/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import { sendImagesToCloudinary } from '../../utils/sendImageToCloudinary';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TCircumstances } from './circumstances.interface';
import { Employee } from '../employee/employee.model';
import { Circumstance } from './circumstances.model';

const createCircumstancesToDB = async (
  files: any[],
  employeeId: string,
  circumstancesData: TCircumstances,
  organisationEmail: string,
) => {
  // create a file map object to hold file URLs
  const fileMap: Record<string, string> = {};

  // console.log('File Map:', fileMap);

  // console.log('Updated Data:', updatedData);

  // Map file URLs into correct nested paths
  const replaceInPath = (pathArray: string[], url: string) => {
    let ref: any = circumstancesData;
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

    updateArrayObjectFields(circumstancesData, fileMap, 'otherDetails');

    const user = await Employee.findById(employeeId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'Employee not found');
    }

    // set user reference in circumstancesData
    circumstancesData.user = user.user;

    // set organisation reference in circumstancesData
    const organisationUser = await User.findOne({ email: organisationEmail });
    if (!organisationUser) {
      throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
    }
    circumstancesData.organisation = organisationUser._id;

    // Create circumstances in the database
    const newCircumstances = await Circumstance.create([circumstancesData], {
      session,
    });

    if (!newCircumstances || newCircumstances.length === 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create circumstances',
      );
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    return newCircumstances;
  } catch (err: any) {
    // Rollback the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    throw new Error(err);
  }
};

export const CircumstancesService = {
  createCircumstancesToDB,
};
