import { Types } from 'mongoose';

export type TOrganisationType =
  | 'Private Company Limited by Shares'
  | 'Charitable Incorporated Organisation'
  | 'Industrial and Provident Society'
  | 'General Partnership'
  | 'Limited Partnership'
  | 'Limited Liability Partnership'
  | 'Sole Proprietorship'
  | 'Public Limited Company'
  | 'Private Company Limited by Guarantee'
  | 'Community Interest Company'
  | 'Unincorporated Association'
  | 'Other';

export type TTradingPeriod =
  | '0 to 6 months'
  | 'Over 6 to 12 months'
  | 'Over 12 to 18 months'
  | 'Over 18 to 36 months'
  | 'Over 36 months +';

export type TNameOfSector =
  | 'Agriculture, Forestry and Fishing'
  | 'Mining and Quarrying'
  | 'Manufacturing'
  | 'Electricity, Gas, Steam and Air Conditioning Supply'
  | 'Water Supply; Sewerage, Waste Management and Remediation Activities'
  | 'Construction'
  | 'Wholesale and Retail Trade; Repair of Motor Vehicles and Motorcycles'
  | 'Transportation and Storage'
  | 'Accommodation and Food Service Activities'
  | 'Information and Communication'
  | 'Financial and Insurance Activities'
  | 'Real Estate Activities'
  | 'Professional, Scientific and Technical Activities'
  | 'Administrative and Support Service Activities'
  | 'Public Administration and Defence; Compulsory Social Security'
  | 'Education'
  | 'Human Health and Social Work Activities'
  | 'Arts, Entertainment and Recreation'
  | 'Activities of Households as Employers; Undifferentiated Goods- and Services-Producing Activities of Households for Own Use'
  | 'Activities of Extraterritorial Organizations and Bodies'
  | 'Other Service Activities';

export type TDaysOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type TOrganisationDetails = {
  name: string;
  type: TOrganisationType;
  registrationNo: string;
  contactNo: string;
  loginEmail: string;
  organisationEmail: string;
  websiteURL: string;
  landlineNo: string;
  tradingName: string;
  tradingPeriod: TTradingPeriod;
  nameOfSector: TNameOfSector;
  logo: string;
  nameChangeLast5Years: 'Yes' | 'No';
  FacedPenaltyLast3Years: 'Yes' | 'No';
};

export type TPerson = {
  firstName: string;
  lastName: string;
  designation: string;
  phoneNo: string;
  email: string;
  criminalHistory: 'Yes' | 'No';
};

export type TAuthorisedPerson = TPerson & {
  proofOfId: string;
};

export type TKeyContactPerson = TPerson & {
  keyPersonProofOfId: string;
};

export type TLevel1Person = TPerson & {
  level1PersonProofOfId: string;
};

export type TAddress = {
  postCode: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  Country: string;
};

export type TTradingHours = {
  day: TDaysOfWeek;
  startTime: string;
  endTime: string;
  status: 'Open' | 'Close';
};

export type TDocument = {
  payeeAccountReference: string;
  latestRti: string;
  employerLiabilityInsurance: string;
  proofOfBusinessPremises: string;
  copyOfLease: string;
  businessBankStatement: string;
  signedAnnualAccount: string;
  vatCertificate: string;
  healthSafetyRating: string;
  regulatoryBodyCertificate: string;
  businessLicense: string;
  franchiseAgreement: string;
  governingBodyRegistration: string;
  auditedAnnualAccount: string;
  othersDocuments: string;
};

export type TEmployer = {
  userId: Types.ObjectId;
  organisationDetails: TOrganisationDetails;
  authorisedPerson: TAuthorisedPerson;
  keyContactPerson: TKeyContactPerson;
  level1User: TLevel1Person;
  organisationAddress: TAddress;
  tradingHours: TTradingHours[];
  documents: TDocument;
};
