import { z } from 'zod';
import { Countries, Nationalities } from '../employee/employee.constant';
import { Types } from 'mongoose';

const EmployeeinfoSchema = z.object({
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
  niNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  nationality: z.enum([...Nationalities] as [string, ...string[]]).optional(),
  contactNo: z.string().min(1, 'Contact number is required'),
  department: z.string().optional(),
  designation: z.string().optional(),
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
  nationality: z.enum([...Nationalities] as [string, ...string[]], {
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
  nationality: z.enum([...Nationalities] as [string, ...string[]], {
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
  nationality: z.enum([...Nationalities] as [string, ...string[]]).optional(),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  eligibleReviewDate: z.string().optional(),
  remarks: z.string().optional(),
  isCurrentStatus: z.enum(['yes', 'no']).optional(),
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

const OtherDetailsSchema = DocumentSchema.extend({
  documentName: z.string().optional(),
  referenceNo: z.string().optional(),
});

const CircumstancesInfoSchema = z.object({
  changedDate: z.string().optional(),
  remarks: z.string().optional(),
  isAwareOfInformHr: z.enum(['yes', 'no', 'n/a']).optional(),
  isAwareOfHomeOfficeInterview: z.enum(['yes', 'no', 'n/a']).optional(),
});

const circumstancesValidationSchema = z.object({
  body: z.object({
    employeeId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid MongoDB ObjectId',
    }),
    employeeData: z.object({
      employeeInfo: EmployeeinfoSchema,
      contactInfo: ContactInfoSchema,
      passportDetails: PassportDetailsSchema,
      visaDetails: VisaDetailsSchema,
      eussDetails: EussDetailsSchema,
      dbsDetails: DbsDetailsSchema,
      nationalIdDetails: NationalIdDetailsSchema,
      otherDetails: z.array(OtherDetailsSchema),
      circumstancesInfo: CircumstancesInfoSchema,
    }),
  }),
});

export const CircumstancesValidations = {
  circumstancesValidationSchema,
};
