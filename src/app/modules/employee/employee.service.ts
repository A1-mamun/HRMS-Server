/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { sendImagesToCloudinary } from '../../utils/sendImageToCloudinary';
import { TEmployee } from './employee.interface';
import { Employee } from './employee.model';

// import { Employer } from './employer.model';

const addEmployeeDocumentsToDB = async (
  files: any[],
  data: TEmployee,
  user: JwtPayload,
) => {
  const fileMap: Record<string, string> = {};

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
  // console.log('File Map:', fileMap);

  const updatedData = { ...data };

  // console.log('Updated Data:', updatedData);

  // Map file URLs into correct nested paths
  const replaceInPath = (pathArray: string[], url: string) => {
    let ref: any = updatedData;
    for (let i = 0; i < pathArray.length - 1; i++) {
      ref = ref[pathArray[i]];
    }

    ref[pathArray[pathArray.length - 1]] = url;
  };

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

  // Replace file objects in `data` with their Cloudinary URLs
  for (const field in fieldMapping) {
    if (fileMap[field]) {
      replaceInPath(fieldMapping[field], fileMap[field]);
    }
  }

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

  updateArrayObjectFields(updatedData, fileMap, 'educationalDetails');
  updateArrayObjectFields(updatedData, fileMap, 'otherDetails');

  console.log('Updated Data:', updatedData);

  // Save to database (or return result)
  const result = await Employee.create(updatedData);
  return result;
};

export const EmployeeServices = {
  addEmployeeDocumentsToDB,
};
