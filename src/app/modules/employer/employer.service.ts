/* eslint-disable @typescript-eslint/no-explicit-any */
// import { JwtPayload } from 'jsonwebtoken';
import { sendImagesToCloudinary } from '../../utils/sendImageToCloudinary';
import { TEmployer } from './employer.interface';
import { User } from '../user/user.model';
import { Employer } from './employer.model';
import { TUser } from '../user/user.interface';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';

const createOrgainsationToDB = async (
  files: any[],
  credentials: { email: string; password: string },
  employerData: TEmployer,
) => {
  // create a user object
  const userData: Partial<TUser> = {};
  userData.email = credentials.email;
  userData.password = credentials.password;
  userData.role = 'employer';

  // create a file map object to hold file URLs
  const fileMap: Record<string, string> = {};

  // Map file URLs into correct nested paths
  const replaceInPath = (pathArray: string[], url: string) => {
    let ref: any = employerData;
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

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create user in db
    const newUser = await User.create([userData], { session });

    if (!newUser || newUser.length === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // upload files to cloudinary
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

    // handle keyContactPerson separately for keyPersonProofOfId
    if ('keyPersonProofOfId' in fileMap) {
      fieldMapping['keyPersonProofOfId'] = ['keyContactPerson', 'proofOfId'];
    } else {
      employerData.keyContactPerson.proofOfId = fileMap.proofOfId;
    }

    // handle level1User separately for level1PersonProofOfId
    if ('level1PersonProofOfId' in fileMap) {
      fieldMapping['level1PersonProofOfId'] = ['level1User', 'proofOfId'];
    } else {
      employerData.level1User.proofOfId = fileMap.proofOfId;
    }

    // Replace file objects in `data` with their Cloudinary URLs
    for (const field in fieldMapping) {
      if (fileMap[field]) {
        replaceInPath(fieldMapping[field], fileMap[field]);
      }
    }

    // console.log('Updated Employer Data:', employerData);

    // set user reference in employerData
    employerData.user = newUser[0]._id;

    // Create employee in the database
    const newEmployer = await Employer.create([employerData], { session });

    if (!newEmployer || newEmployer.length === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create employer');
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    return newEmployer;
  } catch (err: any) {
    // Rollback the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    throw new Error(err);
  }
};

const getAllOrganisationsFromDB = async (query: Record<string, unknown>) => {
  const organisationsQuery = new QueryBuilder(Employer.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await organisationsQuery.modelQuery;
  const meta = await organisationsQuery.countTotal();
  return {
    result,
    meta,
  };
};

const updateOrganisationToDB = async (
  id: string,
  files: any[],
  employerData: TEmployer,
) => {
  const fileMap: Record<string, string> = {};

  const replaceInPath = (pathArray: string[], url: string) => {
    let ref: any = employerData;
    for (let i = 0; i < pathArray.length - 1; i++) {
      ref = ref?.[pathArray[i]];
    }
    if (ref) ref[pathArray[pathArray.length - 1]] = url;
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
    keyPersonProofOfId: ['keyContactPerson', 'proofOfId'],
    level1PersonProofOfId: ['level1User', 'proofOfId'],
  };

  if (files && files.length > 0) {
    const filesToUpload = files.map((file) => ({
      imageName: `employer_${file.fieldname}_${Date.now()}`,
      path: file.path,
    }));

    const uploadedFiles = await sendImagesToCloudinary(filesToUpload);

    uploadedFiles.forEach((img, idx) => {
      fileMap[files[idx].fieldname] = img.secure_url as string;
    });

    // Replace file URLs in nested employerData
    for (const field in fieldMapping) {
      if (fileMap[field]) {
        replaceInPath(fieldMapping[field], fileMap[field]);
      }
    }
  }

  const updatedEmployer = await Employer.findByIdAndUpdate(id, employerData, {
    new: true,
    runValidators: true,
  });

  if (!updatedEmployer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  return updatedEmployer;
};

export const EmployerServices = {
  createOrgainsationToDB,
  getAllOrganisationsFromDB,
  updateOrganisationToDB,
};
