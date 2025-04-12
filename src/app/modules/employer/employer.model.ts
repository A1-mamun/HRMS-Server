import { model, Schema } from 'mongoose';
import { TEmployer, TOrganisationDetails } from './employer.interface';
import {
  OrganisationTypes,
  SectorsName,
  TradingPeriod,
} from './employer.constant';

const organisationDetailsSchema = new Schema<TOrganisationDetails>({
  name: { type: String, required: [true, 'Organisation name is required'] },
  type: {
    type: String,
    enum: {
      values: OrganisationTypes,
      message: '{VALUE} is not supported',
    },
    required: [true, 'Organisation type is required'],
  },
  registrationNo: {
    type: String,
    unique: true,
    required: [true, 'Rgistration number is required'],
  },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  loginEmail: {
    type: String,
    unique: true,
    required: [true, 'Login email is required'],
  },
  organisationEmail: {
    type: String,
    required: [true, 'Organisation email is required'],
  },
  websiteURL: { type: String },
  landlineNo: { type: String },
  tradingName: { type: String, required: [true, 'Trading name is required'] },
  tradingPeriod: {
    type: String,
    enum: {
      values: TradingPeriod,
      message: '{VALUE} is not supported',
    },
    required: [true, 'Trading period is required'],
  },
  nameOfSector: {
    type: String,
    enum: {
      values: SectorsName,
      message: '{VALUE} is not supported',
    },
    required: true,
  },
  logo: { type: String, required: [true, 'Organisation logo is required'] },
  nameChangeLast5Years: {
    type: String,
    enum: {
      values: ['Yes', 'No'],
      message: '{VALUE} is not supported',
    },
    required: [true, 'Is name changed in last 5 years? is required'],
  },
  FacedPenaltyLast3Years: {
    type: String,
    enum: {
      values: ['Yes', 'No'],
      message: '{VALUE} is not supported',
    },
    required: [true, 'Is faced penalty in last 3 years? is required'],
  },
});

const personSchema = new Schema({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
  designation: { type: String, required: [true, 'Designation is required'] },
  phoneNo: { type: String, required: [true, 'Phone number is required'] },
  email: { type: String, unique: true, required: [true, 'Email is required'] },
  proofOfId: { type: String },
  criminalHistory: {
    type: String,
    enum: {
      values: ['Yes', 'No'],
      message: '{VALUE} is not supported',
    },
    required: [true, 'Criminal history is required'],
  },
});

const addressSchema = new Schema({
  postCode: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  addressLine3: { type: String },
  city: { type: String },
  country: { type: String },
});

const tradingHoursSchema = new Schema({
  day: {
    type: String,
    enum: {
      values: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      message: '{VALUE} is not supported',
    },
    required: [true, 'Day is required'],
  },
  startTime: { type: String, required: [true, 'Start time is required'] },
  endTime: { type: String, required: [true, 'End time is required'] },
  status: {
    type: String,
    enum: {
      values: ['Open', 'Close'],
      message: '{VALUE} is not supported',
    },
    required: [true, 'Status is required'],
  },
});

const documentSchema = new Schema({
  payeeAccountReference: { type: String },
  latestRti: { type: String },
  employerLiabilityInsurance: { type: String },
  proofOfBusinessPremises: { type: String },
  copyOfLease: { type: String },
  businessBankStatement: { type: String },
  signedAnnualAccount: { type: String },
  vatCertificate: { type: String },
  healthSafetyRating: { type: String },
  regulatoryBodyCertificate: { type: String },
  businessLicense: { type: String },
  franchiseAgreement: { type: String },
  governingBodyRegistration: { type: String },
  auditedAnnualAccount: { type: String },
  othersDocuments: { type: String },
});

const employerSchema = new Schema<TEmployer>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    organisationDetails: {
      type: organisationDetailsSchema,
      required: [true, 'Organisation details is required'],
    },
    authorisedPerson: {
      type: personSchema,
      required: [true, 'Authorised person details is required'],
    },
    keyContactPerson: {
      type: personSchema,
      required: [true, 'Key contact person details is required'],
    },
    level1User: {
      type: personSchema,
      required: [true, 'Level 1 user details is required'],
    },
    organisationAddress: {
      type: addressSchema,
      required: [true, 'Organisation address is required'],
    },
    tradingHours: {
      type: [tradingHoursSchema],
    },
    documents: {
      type: documentSchema,
    },
  },
  {
    timestamps: true,
  },
);

export const Employer = model<TEmployer>('Employer', employerSchema);
