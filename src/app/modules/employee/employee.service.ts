/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { sendImagesToCloudinary } from '../../utils/sendImageToCloudinary';
import { TEmployee } from './employee.interface';

// import { Employer } from './employer.model';

const addEmployeeDocumentsToDB = async (
  files: any[],
  data: TEmployee,
  user: JwtPayload,
) => {
  const fileMap: Record<string, string> = {};

  if (files) {
    const imagesToUpload = files.map((file) => ({
      imageName: `org_${file.fieldname}_${Date.now()}`,
      path: file.path,
    }));

    const uploadedImages = await sendImagesToCloudinary(imagesToUpload);
    uploadedImages.forEach((img, idx) => {
      fileMap[files[idx].fieldname] = img.secure_url as string;
    });
  }
  console.log('File Map:', fileMap);
  // Replace file objects in `data` with their Cloudinary URLs
  const updatedData = { ...data };

  // Save to database (or return result)
  // const result = await Employer.create(updatedData);
  return null;
};

export const EmployeeServices = {
  addEmployeeDocumentsToDB,
};
