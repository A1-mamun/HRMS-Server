import { z } from 'zod';

const PersonalDetailsSchema = z.object({
  employeeCode: z.string(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  gender: z.string(),
  niNumber: z.string(),
  dateOfBirth: z.string(),
  maritalStatus: z.string(),
  nationality: z.string(),
  email: z.string().email(),
  contactNo: z.string(),
  alternativeNo: z.string().optional(),
});

const ServiceDetailsSchema = z.object({
  department: z.string(),
  designation: z.string(),
  dateOfJoining: z.string(),
  employeeType: z.string(),
  dateOfConfirmation: z.string().optional(),
  contractStartDate: z.string().optional(),
  contractEndDate: z.string().optional(),
  jobLocation: z.string(),
  profilePicture: z.string().optional(),
});

const TrainingDetailsSchema = z.object({
  department: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  jobDescription: z.string(),
});

const NextOfKinDetailsSchema = z.object({
  nextOfKinContactName: z.string(),
  nextOfKinContactRelationship: z.string(),
  nextOfKinContactEmail: z.string().email(),
  nextOfKinContactNumber: z.string(),
  nextOfKinContactAddress: z.string(),
});

const CertifiedMembershipSchema = z.object({
  licenseTitle: z.string(),
  licenseNo: z.string(),
  issueDate: z.string(),
  expiryDate: z.string(),
});

const ContactInfoSchema = z.object({
  postCode: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  city: z.string(),
  country: z.string(),
  proofOfAddress: z.string(),
});

const DocumentSchema = z.object({
  nationality: z.string(),
  issueDate: z.string(),
  expiryDate: z.string(),
  eligibleReviewDate: z.string(),
  document: z.string(),
  remarks: z.string(),
  isCurrentStatus: z.boolean(),
});

const PassportDetailsSchema = DocumentSchema.extend({
  passportNo: z.string(),
  placeOfBirth: z.string(),
  issuedBy: z.string(),
});

const VisaDetailsSchema = DocumentSchema.extend({
  visaNo: z.string(),
  countryOfResidence: z.string(),
  issuedBy: z.string(),
  frontsideDocument: z.string(),
  backsideDocument: z.string(),
});

const EussDetailsSchema = DocumentSchema.extend({
  referenceNo: z.string(),
});

const DbsDetailsSchema = DocumentSchema.extend({
  type: z.string(),
  referenceNo: z.string(),
});

const NationalIdDetailsSchema = DocumentSchema.extend({
  nationalIdNo: z.string(),
  countryOfResidence: z.string(),
});

const PayDetailsSchema = z.object({
  paymentGroup: z.string(),
  wedgesPaymentMode: z.string(),
  annualPay: z.string(),
  paymentType: z.string(),
  basicDailyWedges: z.string(),
  minWorkingHour: z.string(),
  rate: z.string(),
  taxCode: z.string(),
  taxReference: z.string(),
  paymentMode: z.string(),
  bankName: z.string(),
  branchName: z.string(),
  accountNo: z.string(),
  sortCode: z.string(),
  paymentCurrency: z.string(),
});

const PayStructureSchema = z.object({
  taxablePayment: z.string(),
  deductions: z.string(),
});

const EducationDetailSchema = z.object({
  qualification: z.string(),
  subject: z.string(),
  institutionName: z.string(),
  awardingBody: z.string(),
  yearOfPassing: z.string(),
  percentage: z.string(),
  grade: z.string(),
  transcriptDocument: z.string().nullable(),
  certificateDocument: z.string().nullable(),
});

const JobDetailSchema = z.object({
  jobTitle: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  yearsOfExperience: z.string(),
  jobDescription: z.string(),
  responsibilities: z.string(),
});

export const employeeValidationSchema = z.object({
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
  educationDetails: z.array(EducationDetailSchema),
  jobDetails: z.array(JobDetailSchema),
});

export const EmployeeValidations = {
  employeeValidationSchema,
};
