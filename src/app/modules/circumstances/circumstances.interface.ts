import { TCountries, TNationalities } from '../../types';
import { Model, Types } from 'mongoose';

export type TEmployeeInfo = {
  employeeCode: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  niNumber?: string;
  dateOfBirth?: string;
  nationality?: TNationalities;
  contactNo?: string;
  department?: string;
  designation?: string;
};

export type TContactInfo = {
  postCode?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  country?: string;
  proofOfAddress?: string;
};

export type TPassportDetails = {
  passportNo?: string;
  nationality?: TNationalities;
  placeOfBirth?: string;
  issuedBy?: string;
  issueDate?: string;
  expiryDate?: string;
  eligibleReviewDate?: string;
  document?: string;
  remarks?: string;
  isCurrentStatus?: 'Yes' | 'No';
};

export type TVisaDetails = {
  visaNo?: string;
  nationality?: TNationalities;
  countryOfResidence?: TCountries;
  issuedBy?: string;
  issueDate?: string;
  expiryDate?: string;
  eligibleReviewDate?: string;
  frontsideDocument?: string;
  backsideDocument?: string;
  remarks?: string;
  isCurrentStatus?: 'Yes' | 'No';
};

export type TEussDetails = {
  referenceNo?: string;
  nationality?: TNationalities;
  issueDate?: string;
  expiryDate?: string;
  eligibleReviewDate?: string;
  document?: string;
  remarks?: string;
  isCurrentStatus?: 'Yes' | 'No';
};

export type TDBSDetails = {
  type?: 'Basic' | 'Standard' | 'Advanced';
  referenceNo?: string;
  nationality?: TNationalities;
  issueDate?: string;
  expiryDate?: string;
  eligibleReviewDate?: string;
  document?: string;
  remarks?: string;
  isCurrentStatus?: 'Yes' | 'No';
};

export type TNationalIdDetails = {
  nationalIdNo?: string;
  nationality?: TNationalities;
  countryOfResidence?: TCountries;
  issueDate?: string;
  expiryDate?: string;
  eligibleReviewDate?: string;
  document?: string;
  remarks?: string;
  isCurrentStatus?: 'Yes' | 'No';
};

export type TOtherDetails = {
  documentName?: string;
  referenceNo?: string;
  nationality?: TNationalities;
  issueDate?: string;
  expiryDate?: string;
  eligibleReviewDate?: string;
  document?: string;
  remarks?: string;
  isCurrentStatus?: 'Yes' | 'No';
};

export type TCircumstancesInfo = {
  changedDate: string;
  remarks: string;
  isAwareOfInformHr: 'Yes' | 'No' | 'N/A';
  isAwareOfHomeOfficeInterview: 'Yes' | 'No' | 'N/A';
};

export type TCircumstances = {
  user: Types.ObjectId;
  organisation: Types.ObjectId;
  employeeInfo: TEmployeeInfo;
  contactInfo: TContactInfo;
  passportDetails: TPassportDetails;
  visaDetails: TVisaDetails;
  eussDetails: TEussDetails;
  dbsDetails: TDBSDetails;
  nationalIdDetails: TNationalIdDetails;
  otherDetails: TOtherDetails[];
  circumstancesInfo: TCircumstancesInfo;
};

export type CircumstancesModel = Model<TCircumstances>;
