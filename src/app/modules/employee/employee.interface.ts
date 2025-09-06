import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { TCountries, TNationalities } from '../../types';

export type TMaritalStatus =
  | 'Married'
  | 'Unmarried'
  | 'Single'
  | 'Divorce'
  | 'Widow';

export type TPaymentTypes =
  | 'Annualy'
  | 'Monthly'
  | 'Weekly'
  | 'Bi-Weekly'
  | 'Daily'
  | 'Hourly'
  | 'Commission';

export type TBankNames =
  | 'Chase Bank (USA)'
  | 'Bank of America (USA)'
  | 'Wells Fargo (USA)'
  | 'Citibank (Global)'
  | 'HSBC (UK & Global)'
  | 'Barclays (UK)'
  | 'Deutsche Bank (Germany)'
  | 'Standard Chartered (Global)';

export type TPaymentCurrencies =
  | 'USD - United States Dollar'
  | 'EUR - Euro (European Union)'
  | 'GBP - British Pound Sterling (UK)'
  | 'INR - Indian Rupee (India)'
  | 'JPY - Japanese Yen (Japan)'
  | 'CAD - Canadian Dollar (Canada)'
  | 'AUD - Australian Dollar (Australia)'
  | 'CNY - Chinese Yuan (China)';

export type TPersonalDetails = {
  employeeCode: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender?: 'Male' | 'Female' | 'Others';
  niNumber?: string;
  dateOfBirth?: string;
  maritalStatus?: TMaritalStatus;
  nationality?: TNationalities;
  email: string;
  contactNo: string;
  alternativeNo?: string;
};

export type TServiceDetails = {
  department?: string;
  designation?: string;
  dateOfJoining?: string;
  employeeType?: string;
  dateOfConfirmation?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  jobLocation?: string;
  profilePicture?: string;
};

export type TEducationDetails = {
  qualification?: string;
  subject?: string;
  institutionName?: string;
  awardingBody?: string;
  yearOfPassing?: string;
  percentage?: string;
  grade?: string;
  transcriptDocument?: string;
  certificateDocument?: string;
};

export type TJobDetails = {
  title?: string;
  startDate?: string;
  endDate?: string;
  experience?: string;
  description?: string;
  responsibilities?: string;
};

export type TTrainingDetails = {
  title?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

export type TNextOfKinDetails = {
  nextOfKinContactName?: string;
  nextOfKinContactRelationship?: string;
  nextOfKinContactEmail?: string;
  nextOfKinContactNumber?: string;
  nextOfKinContactAddress?: string;
};

export type TCertifiedMembership = {
  licenseTitle?: string;
  licenseNo?: string;
  issueDate?: string;
  expiryDate?: string;
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
  passportNo: string;
  nationality: TNationalities;
  placeOfBirth: string;
  issuedBy: string;
  issueDate: string;
  expiryDate: string;
  eligibleReviewDate: string;
  document: string;
  remarks: string;
  isCurrentStatus: 'Yes' | 'No';
};

export type TVisaDetails = {
  visaNo: string;
  nationality: TNationalities;
  countryOfResidence: TCountries;
  issuedBy: string;
  issueDate: string;
  expiryDate: string;
  eligibleReviewDate: string;
  frontsideDocument: string;
  backsideDocument: string;
  remarks: string;
  isCurrentStatus: 'Yes' | 'No';
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

export type TPayDetails = {
  paymentGroup?: 'Group 1' | 'Group 2';
  wedgesPaymentMode?: 'Pay 1' | 'Pay 2';
  annualPay?: 'Annual Pay 1' | 'Annual Pay 2';
  paymentType?: TPaymentTypes;
  basicDailyWedges?: string;
  minWorkingHour?: number;
  rate?: string;
  taxCode?: 'Tax Code 1' | 'Tax Code 2';
  taxReference?: string;
  paymentMode?: 'Mode 1' | 'Mode 2';
  bankName?: TBankNames;
  branchName?: string;
  accountNo?: string;
  sortCode?: string;
  paymentCurrency?: TPaymentCurrencies;
};

export type TPayStructure = {
  taxablePayment?: string[];
  deductions?: string[];
};

export type TEmployee = {
  user: Types.ObjectId;
  organisation: Types.ObjectId;
  personalDetails: TPersonalDetails;
  serviceDetails: TServiceDetails;
  educationalDetails: TEducationDetails[];
  jobDetails: TJobDetails[];
  trainingDetails: TTrainingDetails[];
  nextOfKinDetails: TNextOfKinDetails;
  certifiedMembership: TCertifiedMembership;
  contactInfo: TContactInfo;
  passportDetails: TPassportDetails;
  visaDetails: TVisaDetails;
  eussDetails: TEussDetails;
  dbsDetails: TDBSDetails;
  nationalIdDetails: TNationalIdDetails;
  otherDetails: TOtherDetails[];
  payDetails: TPayDetails;
  payStructure: TPayStructure;
};

export type EmployeeModel = Model<TEmployee>;
