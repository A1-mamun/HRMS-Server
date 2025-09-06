import { Nationalities } from '../employee/employee.constant';
import {
  CircumstancesModel,
  TCircumstances,
  TCircumstancesInfo,
  TContactInfo,
  TDBSDetails,
  TEmployeeInfo,
  TEussDetails,
  TNationalIdDetails,
  TOtherDetails,
  TPassportDetails,
  TVisaDetails,
} from './circumstances.interface';
import { Schema, model } from 'mongoose';

const EmployeeInfoSchema = new Schema<TEmployeeInfo>(
  {
    employeeCode: {
      type: String,
      required: [true, 'Employee code is required'],
    },
    firstName: { type: String, required: [true, 'First name is required'] },
    middleName: String,
    lastName: { type: String, required: [true, 'Last name is required'] },
    niNumber: String,
    dateOfBirth: String,
    nationality: { type: String, enum: Nationalities },

    contactNo: { type: String, required: [true, 'Contact no is required'] },
    department: String,
    designation: String,
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

const CircumstancesInfoSchema = new Schema<TCircumstancesInfo>({
  changedDate: String,
  remarks: String,
  isAwareOfInformHr: {
    type: String,
    enum: {
      values: ['Yes', 'No', 'N/A'],
      message: '{VALUE} is not supported',
    },
    required: [true, 'Is Aware Of Inform Hr is required'],
  },
  isAwareOfHomeOfficeInterview: {
    type: String,
    enum: {
      values: ['Yes', 'No', 'N/A'],
      message: '{VALUE} is not supported',
    },
    required: [true, 'Is Aware Of Home Office Interview is required'],
  },
});

const CircumstancesSchema = new Schema<TCircumstances, CircumstancesModel>(
  {
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
    employeeInfo: EmployeeInfoSchema,
    contactInfo: ContactInfoSchema,
    passportDetails: PassportDetailsSchema,
    visaDetails: VisaDetailsSchema,
    eussDetails: EussDetailsSchema,
    dbsDetails: DbsDetailsSchema,
    nationalIdDetails: NationalIdDetailsSchema,
    otherDetails: [OtherDetailsSchema],
    circumstancesInfo: CircumstancesInfoSchema,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Circumstance = model<TCircumstances, CircumstancesModel>(
  'Circumstance',
  CircumstancesSchema,
);
