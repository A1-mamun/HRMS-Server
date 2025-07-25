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

const PersonalDetailsUpdateSchema = PersonalDetailsSchema.partial();

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

const ServiceDetailsUpdateSchema = ServiceDetailsSchema.partial();

const EducationDetailSchema = z.object({
  qualification: z.string().optional(),
  subject: z.string().optional(),
  institutionName: z.string().optional(),
  awardingBody: z.string().optional(),
  yearOfPassing: z.string().optional(),
  percentage: z.string().optional(),
  grade: z.string().optional(),
});

const EducationDetailUpdateSchema = EducationDetailSchema.partial();

const JobDetailSchema = z.object({
  title: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  experience: z.string().optional(),
  description: z.string().optional(),
  responsibilities: z.string().optional(),
});

const JobDetailUpdateSchema = JobDetailSchema.partial();

const TrainingDetailsSchema = z.object({
  title: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

const TrainingDetailsUpdateSchema = TrainingDetailsSchema.partial();

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

const NextOfKinDetailsUpdateSchema = NextOfKinDetailsSchema.partial();

const CertifiedMembershipSchema = z.object({
  licenseTitle: z.string().optional(),
  licenseNo: z.string().optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
});

const CertifiedMembershipUpdateSchema = CertifiedMembershipSchema.partial();

const ContactInfoSchema = z.object({
  postCode: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  city: z.string().optional(),
  country: z.enum([...Countries] as [string, ...string[]]).optional(),
});

const ContactInfoUpdateSchema = ContactInfoSchema.partial();

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

const PassportDetailsUpdateSchema = PassportDetailsSchema.partial();

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

const VisaDetailsUpdateSchema = VisaDetailsSchema.partial();

const DocumentSchema = z.object({
  nationality: z.enum([...Nationalies] as [string, ...string[]]).optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  eligibleReviewDate: z.string().optional(),
  remarks: z.string().optional(),
  isCurrentStatus: z.enum(['yes', 'no']).optional(),
});

const EussDetailsSchema = DocumentSchema.extend({
  referenceNo: z.string().optional(),
});

const EussDetailsUpdateSchema = EussDetailsSchema.partial();

const DbsDetailsSchema = DocumentSchema.extend({
  type: z.string().optional(),
  referenceNo: z.string().optional(),
});

const DbsDetailsUpdateSchema = DbsDetailsSchema.partial();

const NationalIdDetailsSchema = DocumentSchema.extend({
  nationalIdNo: z.string().optional(),
  countryOfResidence: z
    .enum([...Countries] as [string, ...string[]])
    .optional(),
});

const NationalIdDetailsUpdateSchema = NationalIdDetailsSchema.partial();

const OtherDetailsSchema = DocumentSchema.extend({
  documentName: z.string().optional(),
  referenceNo: z.string().optional(),
});

const OtherDetailsUpdateSchema = OtherDetailsSchema.partial();

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

const PayDetailsUpdateSchema = PayDetailsSchema.partial();

const PayStructureSchema = z.object({
  taxablePayment: z.array(z.string()).optional(),
  deductions: z.array(z.string()).optional(),
});

const PayStructureUpdateSchema = PayStructureSchema.partial();

const employeeValidationSchema = z.object({
  body: z.object({
    credentials: z.object({
      email: z
        .string({ required_error: 'Email is required' })
        .min(1, 'Email is required')
        .email({ message: 'Invalid email address' }),
      password: z
        .string({ required_error: 'Password is required' })
        .min(1, 'Password is required'),
    }),
    employeeData: z.object({
      personalDetails: PersonalDetailsSchema,
      serviceDetails: ServiceDetailsSchema,
      educationalDetails: z.array(EducationDetailSchema),
      jobDetails: z.array(JobDetailSchema),
      trainingDetails: z.array(TrainingDetailsSchema),
      nextOfKinDetails: NextOfKinDetailsSchema,
      certifiedMembership: CertifiedMembershipSchema,
      contactInfo: ContactInfoSchema,
      passportDetails: PassportDetailsSchema,
      visaDetails: VisaDetailsSchema,
      eussDetails: EussDetailsSchema,
      dbsDetails: DbsDetailsSchema,
      nationalIdDetails: NationalIdDetailsSchema,
      otherDetails: z.array(OtherDetailsSchema),
      payDetails: PayDetailsSchema,
      payStructure: PayStructureSchema,
    }),
  }),
});

const employeeUpdateValidationSchema = z.object({
  body: z.object({
    employeeData: z.object({
      personalDetails: PersonalDetailsUpdateSchema.optional(),
      serviceDetails: ServiceDetailsUpdateSchema.optional(),
      educationalDetails: z.array(EducationDetailUpdateSchema).optional(),
      jobDetails: z.array(JobDetailUpdateSchema).optional(),
      trainingDetails: z.array(TrainingDetailsUpdateSchema).optional(),
      nextOfKinDetails: NextOfKinDetailsUpdateSchema.optional(),
      certifiedMembership: CertifiedMembershipUpdateSchema.optional(),
      contactInfo: ContactInfoUpdateSchema.optional(),
      passportDetails: PassportDetailsUpdateSchema.optional(),
      visaDetails: VisaDetailsUpdateSchema.optional(),
      eussDetails: EussDetailsUpdateSchema.optional(),
      dbsDetails: DbsDetailsUpdateSchema.optional(),
      nationalIdDetails: NationalIdDetailsUpdateSchema.optional(),
      otherDetails: z.array(OtherDetailsUpdateSchema).optional(),
      payDetails: PayDetailsUpdateSchema.optional(),
      payStructure: PayStructureUpdateSchema.optional(),
    }),
  }),
});

export const EmployeeValidations = {
  employeeValidationSchema,
  employeeUpdateValidationSchema,
};
