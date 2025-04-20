import { Schema, model } from 'mongoose';
import {
  TCertifiedMembership,
  TContactInfo,
  TDBSDetails,
  TEducationDetails,
  TEmployee,
  TEussDetails,
  TJobDetails,
  TNationalIdDetails,
  TNextOfKinDetails,
  TPassportDetails,
  TPayDetails,
  TPayStructure,
  TPersonalDetails,
  TServiceDetails,
  TTrainingDetails,
  TVisaDetails,
} from './employee.interface';

const PersonalDetailsSchema = new Schema<TPersonalDetails>(
  {
    employeeCode: String,
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    niNumber: String,
    dateOfBirth: String,
    maritalStatus: String,
    nationality: String,
    email: String,
    contactNo: String,
    alternativeNo: String,
  },
  { _id: false },
);

const ServiceDetailsSchema = new Schema<TServiceDetails>(
  {
    department: String,
    designation: String,
    dateOfJoining: String,
    employeeType: String,
    dateOfConfirmation: String,
    contractStartDate: String,
    contractEndDate: String,
    jobLocation: String,
    profilePicture: String,
  },
  { _id: false },
);

const TrainingDetailsSchema = new Schema<TTrainingDetails>(
  {
    department: String,
    startDate: String,
    endDate: String,
    jobDescription: String,
  },
  { _id: false },
);

const NextOfKinDetailsSchema = new Schema<TNextOfKinDetails>(
  {
    nextOfKinContactName: String,
    nextOfKinContactRelationship: String,
    nextOfKinContactEmail: String,
    nextOfKinContactNumber: String,
    nextOfKinContactAddress: String,
  },
  { _id: false },
);

const CertifiedMembershipSchema = new Schema<TCertifiedMembership>(
  {
    licenseTitle: String,
    licenseNo: String,
    issueDate: String,
    expiryDate: String,
  },
  { _id: false },
);

const ContactInfoSchema = new Schema<TContactInfo>(
  {
    postCode: String,
    addressLine1: String,
    addressLine2: String,
    addressLine3: String,
    city: String,
    country: String,
    proofOfAddress: String,
  },
  { _id: false },
);

const PassportDetailsSchema = new Schema<TPassportDetails>(
  {
    passportNo: String,
    nationality: String,
    placeOfBirth: String,
    issuedBy: String,
    issueDate: String,
    expiryDate: String,
    eligibleReviewDate: String,
    document: String,
    remarks: String,
    isCurrentStatus: Boolean,
  },
  { _id: false },
);

const VisaDetailsSchema = new Schema<TVisaDetails>(
  {
    visaNo: String,
    nationality: String,
    countryOfResidence: String,
    issuedBy: String,
    issueDate: String,
    expiryDate: String,
    eligibleReviewDate: String,
    frontsideDocument: String,
    backsideDocument: String,
    remarks: String,
    isCurrentStatus: Boolean,
  },
  { _id: false },
);

const EussDetailsSchema = new Schema<TEussDetails>(
  {
    referenceNo: String,
    nationality: String,
    issueDate: String,
    expiryDate: String,
    eligibleReviewDate: String,
    document: String,
    remarks: String,
    isCurrentStatus: Boolean,
  },
  { _id: false },
);

const DbsDetailsSchema = new Schema<TDBSDetails>(
  {
    type: String,
    referenceNo: String,
    nationality: String,
    issueDate: String,
    expiryDate: String,
    eligibleReviewDate: String,
    document: String,
    remarks: String,
    isCurrentStatus: Boolean,
  },
  { _id: false },
);

const NationalIdDetailsSchema = new Schema<TNationalIdDetails>(
  {
    nationalIdNo: String,
    nationality: String,
    countryOfResidence: String,
    issueDate: String,
    expiryDate: String,
    eligibleReviewDate: String,
    document: String,
    remarks: String,
    isCurrentStatus: Boolean,
  },
  { _id: false },
);

const PayDetailsSchema = new Schema<TPayDetails>(
  {
    paymentGroup: String,
    wedgesPaymentMode: String,
    annualPay: String,
    paymentType: String,
    basicDailyWedges: String,
    minWorkingHour: String,
    rate: String,
    taxCode: String,
    taxReference: String,
    paymentMode: String,
    bankName: String,
    branchName: String,
    accountNo: String,
    sortCode: String,
    paymentCurrency: String,
  },
  { _id: false },
);

const PayStructureSchema = new Schema<TPayStructure>(
  {
    taxablePayment: String,
    deductions: String,
  },
  { _id: false },
);

const EducationDetailSchema = new Schema<TEducationDetails>(
  {
    qualification: String,
    subject: String,
    institutionName: String,
    awardingBody: String,
    yearOfPassing: String,
    percentage: String,
    grade: String,
    transcriptDocument: String,
    certificateDocument: String,
  },
  { _id: false },
);

const JobDetailSchema = new Schema<TJobDetails>(
  {
    jobTitle: String,
    startDate: String,
    endDate: String,
    yearsOfExperience: String,
    jobDescription: String,
    responsibilities: String,
  },
  { _id: false },
);

const EmployeeSchema = new Schema<TEmployee>({
  personalDetails: PersonalDetailsSchema,
  serviceDetails: ServiceDetailsSchema,
  trainingDetails: TrainingDetailsSchema,
  nextOfKinDetails: NextOfKinDetailsSchema,
  certifiedMembership: CertifiedMembershipSchema,
  contactiInfo: ContactInfoSchema,
  pasportDetails: PassportDetailsSchema,
  visaDetails: VisaDetailsSchema,
  eussDetails: EussDetailsSchema,
  dbsDetails: DbsDetailsSchema,
  nationalIdDetails: NationalIdDetailsSchema,
  payDetails: PayDetailsSchema,
  payStructure: PayStructureSchema,
  educationDetails: [EducationDetailSchema],
  jobDetails: [JobDetailSchema],
});

export const Employee = model<TEmployee>('Employee', EmployeeSchema);
