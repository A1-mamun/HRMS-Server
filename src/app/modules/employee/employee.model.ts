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
  TOtherDetails,
  TPassportDetails,
  TPayDetails,
  TPayStructure,
  TPersonalDetails,
  TServiceDetails,
  TTrainingDetails,
  TVisaDetails,
} from './employee.interface';
import { MaritalStatus, Nationalies } from './employee.constant';

const PersonalDetailsSchema = new Schema<TPersonalDetails>(
  {
    employeeCode: {
      type: String,
      required: [true, 'Employee code is required'],
    },
    firstName: { type: String, required: [true, 'First name is required'] },
    middleName: String,
    lastName: { type: String, required: [true, 'Last name is required'] },
    gender: String,
    niNumber: String,
    dateOfBirth: String,
    maritalStatus: { type: String, enum: MaritalStatus },
    nationality: { type: String, enum: Nationalies },
    email: {
      type: String,
      unique: true,
      required: [true, 'Login email is required'],
    },
    contactNo: { type: String, required: [true, 'Contact no is required'] },
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
    title: String,
    startDate: String,
    endDate: String,
    experience: String,
    description: String,
    responsibilities: String,
  },
  { _id: false },
);

const TrainingDetailsSchema = new Schema<TTrainingDetails>(
  {
    title: String,
    startDate: String,
    endDate: String,
    description: String,
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
    isCurrentStatus: {
      type: String,
      enum: {
        values: ['yes', 'no'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'Passport Status Is Current? is required'],
    },
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
    isCurrentStatus: {
      type: String,
      enum: {
        values: ['yes', 'no'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'Visa Status Is Current? is required'],
    },
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
    isCurrentStatus: {
      type: String,
      enum: {
        values: ['yes', 'no'],
      },
    },
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
    isCurrentStatus: {
      type: String,
      enum: {
        values: ['yes', 'no'],
      },
    },
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
    isCurrentStatus: {
      type: String,
      enum: {
        values: ['yes', 'no'],
      },
    },
  },
  { _id: false },
);

const OtherDetailsSchema = new Schema<TOtherDetails>(
  {
    documentName: String,
    referenceNo: String,
    issueDate: String,
    expiryDate: String,
    eligibleReviewDate: String,
    document: String,
    remarks: String,
    isCurrentStatus: {
      type: String,
      enum: {
        values: ['yes', 'no'],
      },
    },
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
    taxablePayment: [String],
    deductions: [String],
  },
  { _id: false },
);

const EmployeeSchema = new Schema<TEmployee>({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  organisation: {
    type: Schema.Types.ObjectId,
    required: [true, 'Organisation user id is required'],
    ref: 'User',
  },
  personalDetails: PersonalDetailsSchema,
  serviceDetails: ServiceDetailsSchema,
  educationalDetails: [EducationDetailSchema],
  jobDetails: [JobDetailSchema],
  trainingDetails: [TrainingDetailsSchema],
  nextOfKinDetails: NextOfKinDetailsSchema,
  certifiedMembership: CertifiedMembershipSchema,
  contactiInfo: ContactInfoSchema,
  pasportDetails: PassportDetailsSchema,
  visaDetails: VisaDetailsSchema,
  eussDetails: EussDetailsSchema,
  dbsDetails: DbsDetailsSchema,
  nationalIdDetails: NationalIdDetailsSchema,
  otherDetails: [OtherDetailsSchema],
  payDetails: PayDetailsSchema,
  payStructure: PayStructureSchema,
});

export const Employee = model<TEmployee>('Employee', EmployeeSchema);
