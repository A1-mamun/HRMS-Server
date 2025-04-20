export type TPersonalDetails = {
  employeeCode: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  niNumber: string;
  dateOfBirth: string;
  maritalStatus: string;
  nationality: string;
  email: string;
  contactNo: string;
  alternativeNo?: string;
};

export type TServiceDetails = {
  department: string;
  designation: string;
  dateOfJoining: string;
  employeeType: string;
  dateOfConfirmation?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  jobLocation: string;
  profilePicture?: string;
};

export type TTrainingDetails = {
  department: string;
  startDate: string;
  endDate: string;
  jobDescription: string;
};

export type TNextOfKinDetails = {
  nextOfKinContactName: string;
  nextOfKinContactRelationship: string;
  nextOfKinContactEmail: string;
  nextOfKinContactNumber: string;
  nextOfKinContactAddress: string;
};

export type TCertifiedMembership = {
  licenseTitle: string;
  licenseNo: string;
  issueDate: string;
  expiryDate: string;
};

export type TContactInfo = {
  postCode: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  country: string;
  proofOfAddress: string;
};

export type TPassportDetails = {
  passportNo: string;
  nationality: string;
  placeOfBirth: string;
  issuedBy: string;
  issueDate: string;
  expiryDate: string;
  eligibleReviewDate: string;
  document: string;
  remarks: string;
  isCurrentStatus: boolean;
};

export type TVisaDetails = {
  visaNo: string;
  nationality: string;
  countryOfResidence: string;
  issuedBy: string;
  issueDate: string;
  expiryDate: string;
  eligibleReviewDate: string;
  frontsideDocument: string;
  backsideDocument: string;
  remarks: string;
  isCurrentStatus: boolean;
};

export type TEussDetails = {
  referenceNo: string;
  nationality: string;
  issueDate: string;
  expiryDate: string;
  eligibleReviewDate: string;
  document: string;
  remarks: string;
  isCurrentStatus: boolean;
};

export type TDBSDetails = {
  type: string;
  referenceNo: string;
  nationality: string;
  issueDate: string;
  expiryDate: string;
  eligibleReviewDate: string;
  document: string;
  remarks: string;
  isCurrentStatus: boolean;
};

export type TNationalIdDetails = {
  nationalIdNo: string;
  nationality: string;
  countryOfResidence: string;
  issueDate: string;
  expiryDate: string;
  eligibleReviewDate: string;
  document: string;
  remarks: string;
  isCurrentStatus: boolean;
};

export type TPayDetails = {
  paymentGroup: string;
  wedgesPaymentMode: string;
  annualPay: string;
  paymentType: string;
  basicDailyWedges: string;
  minWorkingHour: string;
  rate: string;
  taxCode: string;
  taxReference: string;
  paymentMode: string;
  bankName: string;
  branchName: string;
  accountNo: string;
  sortCode: string;
  paymentCurrency: string;
};

export type TPayStructure = {
  taxablePayment: string;
  deductions: string;
};
export type TEducationDetails = {
  qualification: string;
  subject: string;
  institutionName: string;
  awardingBody: string;
  yearOfPassing: string;
  percentage: string;
  grade: string;
  transcriptDocument: string | null;
  certificateDocument: string | null;
};

export type TJobDetails = {
  jobTitle: string;
  startDate: string;
  endDate: string;
  yearsOfExperience: string;
  jobDescription: string;
  responsibilities: string;
};

export type TEmployee = {
  personalDetails: TPersonalDetails;
  serviceDetails: TServiceDetails;
  trainingDetails: TTrainingDetails;
  nextOfKinDetails: TNextOfKinDetails;
  certifiedMembership: TCertifiedMembership;
  contactiInfo: TContactInfo;
  pasportDetails: TPassportDetails;
  visaDetails: TVisaDetails;
  eussDetails: TEussDetails;
  dbsDetails: TDBSDetails;
  nationalIdDetails: TNationalIdDetails;
  payDetails: TPayDetails;
  payStructure: TPayStructure;
  educationDetails: TEducationDetails[];
  jobDetails: TJobDetails[];
};
