/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { sendImagesToCloudinary } from '../../utils/sendImageToCloudinary';
import { TEmployer } from './employer.interface';
import { User } from '../user/user.model';
import { Employer } from './employer.model';

const addOrgDocumentsToDB = async (
  files: any[],
  data: TEmployer,
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
    logo: ['organisationDetails', 'logo'],
    proofOfId: ['authorisedPerson', 'proofOfId'],
    payeeAccountReference: ['documents', 'payeeAccountReference'],
    latestRti: ['documents', 'latestRti'],
    employerLiabilityInsurance: ['documents', 'employerLiabilityInsurance'],
    proofOfBusinessPremises: ['documents', 'proofOfBusinessPremises'],
    copyOfLease: ['documents', 'copyOfLease'],
    businessBankStatement: ['documents', 'businessBankStatement'],
    signedAnnualAccount: ['documents', 'signedAnnualAccount'],
    vatCertificate: ['documents', 'vatCertificate'],
    healthSafetyRating: ['documents', 'healthSafetyRating'],
    regulatoryBodyCertificate: ['documents', 'regulatoryBodyCertificate'],
    businessLicense: ['documents', 'businessLicense'],
    franchiseAgreement: ['documents', 'franchiseAgreement'],
    governingBodyRegistration: ['documents', 'governingBodyRegistration'],
    auditedAnnualAccount: ['documents', 'auditedAnnualAccount'],
    othersDocuments: ['documents', 'othersDocuments'],
  };

  // handle keyContactPerson separately for keyPersonProofOfId
  if ('keyPersonProofOfId' in fileMap) {
    fieldMapping['keyPersonProofOfId'] = ['keyContactPerson', 'proofOfId'];
  } else {
    updatedData.keyContactPerson.proofOfId = fileMap.proofOfId;
  }

  // handle level1User separately for level1PersonProofOfId
  if ('level1PersonProofOfId' in fileMap) {
    fieldMapping['level1PersonProofOfId'] = ['level1User', 'proofOfId'];
  } else {
    updatedData.level1User.proofOfId = fileMap.proofOfId;
  }

  // Replace file objects in `data` with their Cloudinary URLs
  for (const field in fieldMapping) {
    if (fileMap[field]) {
      replaceInPath(fieldMapping[field], fileMap[field]);
    }
  }

  // find user id from db
  const userId = await User.findOne({ email: user.email }).select('_id');

  // add userId to updatedData
  if (userId) {
    updatedData.user = userId?._id;
  }
  // console.log('Updated Data:', updatedData);

  // Save to database (or return result)
  const result = await Employer.create(updatedData);
  return result;
};

export const EmployerServices = {
  addOrgDocumentsToDB,
};
