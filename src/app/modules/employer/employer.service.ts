/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImagesToCloudinary } from '../../utils/sendImageToCloudinary';
import { TEmployer } from './employer.interface';
import { User } from '../user/user.model';
import { Employer } from './employer.model';
import { TUser } from '../user/user.interface';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { Department } from '../department/department.model';
import { Designation } from '../designation/designation.model';
import { EmploymentType } from '../employmentType/employmentType.model';
import { PayGroup } from '../payGroup/payGroup.model';
import { AnnualPay } from '../annualPay/annualPay.model';
import { BankMaster } from '../bankMaster/bankMaster.model';
import { BankSortcode } from '../bankSortcode/bankSortcode.model';
import { TaxMaster } from '../taxMaster/taxMaster.model';
import { PaymentType } from '../paymentType/paymentType.model';
import { WedgesPayMode } from '../wedgesPayMode/wedgesPayMode.model';

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

const getSingleOrganisationFromDB = async (id: string) => {
  const result = await Employer.findById(id);
  return result;
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

    // handle keyContactPerson separately for keyPersonProofOfId
    if ('keyPersonProofOfId' in fileMap) {
      fieldMapping['keyPersonProofOfId'] = ['keyContactPerson', 'proofOfId'];
    }

    // handle level1User separately for level1PersonProofOfId
    if ('level1PersonProofOfId' in fileMap) {
      fieldMapping['level1PersonProofOfId'] = ['level1User', 'proofOfId'];
    }

    // Replace file URLs in nested employerData
    for (const field in fieldMapping) {
      if (fileMap[field]) {
        replaceInPath(fieldMapping[field], fileMap[field]);
      }
    }
  }

  const employer = await Employer.findById(id);
  if (!employer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }

  employerData.user = employer.user; // Ensure user reference remains unchanged

  const user = await User.findById(employer.user);

  employerData.organisationDetails.loginEmail = user?.email as string;

  const updatedEmployer = await Employer.findByIdAndUpdate(id, employerData, {
    new: true,
    runValidators: true,
  });

  if (!updatedEmployer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }
  return updatedEmployer;
};

const getHCMMasterDataFromDB = async (organisationEmail: string) => {
  // check if the user exists
  const user = await User.findOne({ email: organisationEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Organisation not found');
  }

  // get the organisation's HCM master data
  const departments = await Department.find({ organisation: user._id }).select(
    'name _id',
  );
  const designations = await Designation.find({
    organisation: user._id,
  }).select('name _id');
  const employmentTypes = await EmploymentType.find({
    organisation: user._id,
  }).select('name _id');
  const payGroups = await PayGroup.find({ organisation: user._id }).select(
    'name _id',
  );
  const annualPays = await AnnualPay.find({ organisation: user._id }).select(
    'name _id',
  );
  const bankMasters = await BankMaster.find({ organisation: user._id }).select(
    'name _id',
  );
  const bankSortCodes = await BankSortcode.find({
    organisation: user._id,
  }).select('name _id');
  const taxMasters = await TaxMaster.find({ organisation: user._id }).select(
    'name _id',
  );
  const paymentTypes = await PaymentType.find({
    organisation: user._id,
  }).select('name _id');
  const wedgesPayModes = await WedgesPayMode.find({
    organisation: user._id,
  }).select('name _id');

  return {
    departments,
    designations,
    employmentTypes,
    payGroups,
    annualPays,
    bankMasters,
    bankSortCodes,
    taxMasters,
    paymentTypes,
    wedgesPayModes,
  };
};

export const EmployerServices = {
  createOrgainsationToDB,
  getAllOrganisationsFromDB,
  getSingleOrganisationFromDB,
  updateOrganisationToDB,
  getHCMMasterDataFromDB,
};
