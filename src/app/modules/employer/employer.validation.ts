import { z } from 'zod';
import {
  DaysOfWeek,
  OrganisationTypes,
  SectorsName,
  TradingPeriod,
} from './employer.constant';

// Define Zod validation for Organisation Details Schema
const organisationDetailsValidationSchema = z.object({
  name: z
    .string()
    .min(2, 'Organisation name must be at least 2 characters long')
    .max(150, 'Organisation name must be at most 150 characters long'),
  type: z.enum([...OrganisationTypes] as [string, ...string[]]),
  registrationNo: z.string().optional(),
  contactNo: z.string(),
  loginEmail: z.string().email('Invalid email format'),
  organisationEmail: z.string().email('Invalid email format'),
  websiteURL: z.string().optional(),
  landlineNo: z.string().optional(),
  tradingName: z
    .string()
    .min(2, 'Trading name must be at least 2 characters long')
    .max(150, 'Trading name must be at most 150 characters long'),
  tradingPeriod: z.enum([...TradingPeriod] as [string, ...string[]]),
  nameOfSector: z.enum([...SectorsName] as [string, ...string[]]),
  nameChangeLast5Years: z.enum(['Yes', 'No']),
  FacedPenaltyLast3Years: z.enum(['Yes', 'No']),
});

// Define Zod validation for Organisation Details Update Schema
const organisationDetailsUpdateValidationSchema =
  organisationDetailsValidationSchema.partial();

// Define Zod validation for Person Schema
const personValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters long')
    .max(20, 'First name must be at most 20 characters long')
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  lastName: z
    .string()
    .min(2, 'First name must be at least 2 characters long')
    .max(20, 'First name must be at most 20 characters long')
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  designation: z
    .string()
    .min(2, 'Designation must be at least 2 characters long')
    .max(80, 'Designation must be at most 80 characters long')
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Designation must start with a capital letter',
    }),
  phoneNo: z.string(),
  email: z.string().email('Invalid email format'),
  criminalHistory: z.enum(['Yes', 'No']),
  proofOfId: z.string().optional(),
});

// Define Zod validation for Person Update Schema
const personUpdateValidationSchema = personValidationSchema.partial();

// Define Zod validation for Address Schema
const addressValidationSchema = z.object({
  postCode: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

// Define Zod validation for Address Update Schema
const addressUpdateValidationSchema = addressValidationSchema.partial();

// Define Zod validation for Trading Hours Schema
const tradingHoursValidationSchema = z.object({
  day: z.enum([...DaysOfWeek] as [string, ...string[]]),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  status: z.enum(['Open', 'Close']).optional(),
});

// Define Zod validation for Trading Hours Update Schema
const tradingHoursUpdateValidationSchema =
  tradingHoursValidationSchema.partial();

// Define Zod validation for Employer Schema
export const employerValidationSchema = z.object({
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
    employerData: z.object({
      organisationDetails: organisationDetailsValidationSchema,
      authorisedPerson: personValidationSchema,
      keyContactPerson: personValidationSchema,
      level1User: personValidationSchema,
      organisationAddress: addressValidationSchema.optional(),
      tradingHours: z.array(tradingHoursValidationSchema).optional(),
    }),
  }),
});

// Define Zod validation for Employer Update Schema
export const employerUpdateValidationSchema = z.object({
  body: z.object({
    employerData: z.object({
      organisationDetails: organisationDetailsUpdateValidationSchema.optional(),
      authorisedPerson: personUpdateValidationSchema.optional(),
      keyContactPerson: personUpdateValidationSchema.optional(),
      level1User: personUpdateValidationSchema.optional(),
      organisationAddress: addressUpdateValidationSchema.optional(),
      tradingHours: z.array(tradingHoursUpdateValidationSchema).optional(),
    }),
  }),
});

export const EmployerValidations = {
  employerValidationSchema,
  employerUpdateValidationSchema,
};
