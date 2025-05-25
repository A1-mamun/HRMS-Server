import { z } from 'zod';
import { Countries, MaritalStatus, Nationalies } from './employee.constant';

const PersonalDetailsSchema = z.object({
  employeeCode: z.string().min(1, 'Employee code is required'),
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .regex(/^[A-Z]/, {
      message: 'First name must start with a capital letter',
    }),
  middleName: z
    .string()
    .optional()
    .refine((val) => !val || /^[A-Z]/.test(val), {
      message: 'Middle name must start with a capital letter',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .regex(/^[A-Z]/, {
      message: 'Last name must start with a capital letter',
    }),
  gender: z.enum(['Male', 'Female', 'Others']).optional(),
  niNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  maritalStatus: z.enum([...MaritalStatus] as [string, ...string[]]).optional(),
  nationality: z.enum([...Nationalies] as [string, ...string[]]).optional(),
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email({ message: 'Invalid email address' }),
  contactNo: z.string().min(1, 'Contact number is required'),
  alternativeNo: z.string().optional(),
});

const ServiceDetailsSchema = z.object({
  department: z.string().optional(),
  designation: z.string().optional(),
  dateOfJoining: z.string().optional(),
  employeeType: z.string().optional(),
  dateOfConfirmation: z.string().optional(),
  contractStartDate: z.string().optional(),
  contractEndDate: z.string().optional(),
  jobLocation: z.string().optional(),
});

const EducationDetailSchema = z.object({
  qualification: z.string().optional(),
  subject: z.string().optional(),
  institutionName: z.string().optional(),
  awardingBody: z.string().optional(),
  yearOfPassing: z.string().optional(),
  percentage: z.string().optional(),
  grade: z.string().optional(),
});

const JobDetailSchema = z.object({
  title: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  experience: z.string().optional(),
  description: z.string().optional(),
  responsibilities: z.string().optional(),
});

const TrainingDetailsSchema = z.object({
  title: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const NextOfKinDetailsSchema = z.object({
  nextOfKinContactName: z.string().optional(),
  nextOfKinContactRelationship: z.string().optional(),
  nextOfKinContactEmail: z
    .string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
  nextOfKinContactNumber: z.string().optional(),
  nextOfKinContactAddress: z.string().optional(),
});

const CertifiedMembershipSchema = z.object({
  licenseTitle: z.string().optional(),
  licenseNo: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
});

const ContactInfoSchema = z.object({
  postCode: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  city: z.string().optional(),
  country: z.enum([...Countries] as [string, ...string[]]).optional(),
});

const PassportDetailsSchema = z.object({
  passportNo: z.string().min(1, 'Passport number is required'),
  nationality: z.enum([...Nationalies] as [string, ...string[]], {
    required_error: 'Nationality is required',
  }),
  placeOfBirth: z.string().min(1, 'Place of birth is required'),
  issuedBy: z
    .string()
    .min(1, 'Issued by is required')
    .regex(/^[A-Z]/, {
      message: 'Must start with a capital letter',
    }),
  issueDate: z.string({ required_error: 'Issue date is required' }),
  expiryDate: z.string({ required_error: 'Expiry date is required' }),
  eligibleReviewDate: z.string({
    required_error: 'Eligible review date is required',
  }),

  remarks: z.string().min(1, 'Remarks is required'),
  isCurrentStatus: z.enum(['yes', 'no'], {
    required_error: 'Status is required',
  }),
});

const VisaDetailsSchema = z.object({
  visaNo: z.string().min(1, 'Visa number is required'),
  nationality: z.enum([...Nationalies] as [string, ...string[]], {
    required_error: 'Nationality is required',
  }),
  countryOfResidence: z.enum([...Countries] as [string, ...string[]], {
    required_error: 'Country of residence is required',
  }),
  issuedBy: z
    .string()
    .min(1, 'Issued by is required')
    .regex(/^[A-Z]/, {
      message: 'Must start with a capital letter',
    }),
  issueDate: z.string({ required_error: 'Issue date is required' }),
  expiryDate: z.string({ required_error: 'Expiry date is required' }),
  eligibleReviewDate: z.string({
    required_error: 'Eligible review date is required',
  }),
  remarks: z.string().min(1, 'Remarks is required'),
  isCurrentStatus: z.enum(['yes', 'no'], {
    required_error: 'Status is required',
  }),
});

const DocumentSchema = z.object({
  nationality: z.enum([...Nationalies] as [string, ...string[]]).optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  eligibleReviewDate: z.string().optional(),
  remarks: z.string().optional(),
  isCurrentStatus: z.enum(['yes', 'no']),
});

const EussDetailsSchema = DocumentSchema.extend({
  referenceNo: z.string().optional(),
});

const DbsDetailsSchema = DocumentSchema.extend({
  type: z.string().optional(),
  referenceNo: z.string().optional(),
});

const NationalIdDetailsSchema = DocumentSchema.extend({
  nationalIdNo: z.string().optional(),
  countryOfResidence: z
    .enum([...Countries] as [string, ...string[]])
    .optional(),
});

const PayDetailsSchema = z.object({
  paymentGroup: z.string().optional(),
  wedgesPaymentMode: z.string().optional(),
  annualPay: z.string().optional(),
  paymentType: z.string().optional(),
  basicDailyWedges: z.string().optional(),
  minWorkingHour: z.string().optional(),
  rate: z.string().optional(),
  taxCode: z.string().optional(),
  taxReference: z.string().optional(),
  paymentMode: z.string().optional(),
  bankName: z.string().optional(),
  branchName: z.string().optional(),
  accountNo: z.string().optional(),
  sortCode: z.string().optional(),
  paymentCurrency: z.string().optional(),
});

const PayStructureSchema = z.object({
  taxablePayment: z.string().optional(),
  deductions: z.string().optional(),
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
