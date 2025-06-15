import { Types } from 'mongoose';

export type TMaritalStatus =
  | 'Married'
  | 'Unmarried'
  | 'Single'
  | 'Divorce'
  | 'Widow';

export type TNationalities =
  | 'Afghan'
  | 'Albanian'
  | 'Algerian'
  | 'Andorran'
  | 'Angolan'
  | 'Antiguan and Barbudan'
  | 'Argentine'
  | 'Armenian'
  | 'Australian'
  | 'Austrian'
  | 'Azerbaijani'
  | 'Bahamian'
  | 'Bahraini'
  | 'Bangladeshi'
  | 'Barbadian'
  | 'Belarusian'
  | 'Belgian'
  | 'Belizean'
  | 'Beninese'
  | 'Bhutanese'
  | 'Bolivian'
  | 'Bosnian and Herzegovinian'
  | 'Botswanan'
  | 'Brazilian'
  | 'Bruneian'
  | 'Bulgarian'
  | 'Burkinabé'
  | 'Burundian'
  | 'Cabo Verdean'
  | 'Cambodian'
  | 'Cameroonian'
  | 'Canadian'
  | 'Central African'
  | 'Chadian'
  | 'Chilean'
  | 'Chinese'
  | 'Colombian'
  | 'Comorian'
  | 'Congolese (Brazzaville)'
  | 'Congolese (Kinshasa)'
  | 'Costa Rican'
  | 'Croatian'
  | 'Cuban'
  | 'Cypriot'
  | 'Czech'
  | 'Danish'
  | 'Djiboutian'
  | 'Dominican'
  | 'Ecuadorian'
  | 'Egyptian'
  | 'Salvadoran'
  | 'Equatorial Guinean'
  | 'Eritrean'
  | 'Estonian'
  | 'Eswatini'
  | 'Ethiopian'
  | 'Fijian'
  | 'Finnish'
  | 'French'
  | 'Gabonese'
  | 'Gambian'
  | 'Georgian'
  | 'German'
  | 'Ghanaian'
  | 'Greek'
  | 'Grenadian'
  | 'Guatemalan'
  | 'Guinean'
  | 'Bissau-Guinean'
  | 'Guyanese'
  | 'Haitian'
  | 'Honduran'
  | 'Hungarian'
  | 'Icelander'
  | 'Indian'
  | 'Indonesian'
  | 'Iranian'
  | 'Iraqi'
  | 'Irish'
  | 'Israeli'
  | 'Italian'
  | 'Jamaican'
  | 'Japanese'
  | 'Jordanian'
  | 'Kazakh'
  | 'Kenyan'
  | 'Kiribati'
  | 'Kuwaiti'
  | 'Kyrgyz'
  | 'Lao'
  | 'Latvian'
  | 'Lebanese'
  | 'Basotho'
  | 'Liberian'
  | 'Libyan'
  | 'Liechtensteiner'
  | 'Lithuanian'
  | 'Luxembourgish'
  | 'Malagasy'
  | 'Malawian'
  | 'Malaysian'
  | 'Maldivian'
  | 'Malian'
  | 'Maltese'
  | 'Mauritanian'
  | 'Mauritian'
  | 'Mexican'
  | 'Moldovan'
  | 'Monacan'
  | 'Mongolian'
  | 'Montenegrin'
  | 'Moroccan'
  | 'Mozambican'
  | 'Burmese'
  | 'Namibian'
  | 'Nauruan'
  | 'Nepali'
  | 'Dutch'
  | 'New Zealander'
  | 'Nicaraguan'
  | 'Nigerien'
  | 'Nigerian'
  | 'North Korean'
  | 'Macedonian'
  | 'Norwegian'
  | 'Omani'
  | 'Pakistani'
  | 'Palauan'
  | 'Panamanian'
  | 'Papua New Guinean'
  | 'Paraguayan'
  | 'Peruvian'
  | 'Filipino'
  | 'Polish'
  | 'Portuguese'
  | 'Qatari'
  | 'Romanian'
  | 'Russian'
  | 'Rwandan'
  | 'Saudi'
  | 'Senegalese'
  | 'Serbian'
  | 'Singaporean'
  | 'Slovak'
  | 'Slovenian'
  | 'South African'
  | 'South Korean'
  | 'Spanish'
  | 'Sri Lankan'
  | 'Sudanese'
  | 'Swedish'
  | 'Swiss'
  | 'Turkish'
  | 'Ukrainian'
  | 'Emirati'
  | 'British'
  | 'American'
  | 'Vietnamese'
  | 'Yemeni'
  | 'Zambian'
  | 'Zimbabwean';

export type TCountries =
  | 'Afghanistan'
  | 'Albania'
  | 'Algeria'
  | 'Andorra'
  | 'Angola'
  | 'Antigua and Barbuda'
  | 'Argentina'
  | 'Armenia'
  | 'Australia'
  | 'Austria'
  | 'Azerbaijan'
  | 'Bahamas'
  | 'Bahrain'
  | 'Bangladesh'
  | 'Barbados'
  | 'Belarus'
  | 'Belgium'
  | 'Belize'
  | 'Benin'
  | 'Bhutan'
  | 'Bolivia'
  | 'Bosnia and Herzegovina'
  | 'Botswana'
  | 'Brazil'
  | 'Brunei'
  | 'Bulgaria'
  | 'Burkina Faso'
  | 'Burundi'
  | 'Cabo Verde'
  | 'Cambodia'
  | 'Cameroon'
  | 'Canada'
  | 'Central African Republic'
  | 'Chad'
  | 'Chile'
  | 'China'
  | 'Colombia'
  | 'Comoros'
  | 'Congo (Congo-Brazzaville)'
  | 'Congo (Congo-Kinshasa)'
  | 'Costa Rica'
  | 'Croatia'
  | 'Cuba'
  | 'Cyprus'
  | 'Czechia'
  | 'Denmark'
  | 'Djibouti'
  | 'Dominica'
  | 'Dominican Republic'
  | 'Ecuador'
  | 'Egypt'
  | 'El Salvador'
  | 'Equatorial Guinea'
  | 'Eritrea'
  | 'Estonia'
  | 'Eswatini'
  | 'Ethiopia'
  | 'Fiji'
  | 'Finland'
  | 'France'
  | 'Gabon'
  | 'Gambia'
  | 'Georgia'
  | 'Germany'
  | 'Ghana'
  | 'Greece'
  | 'Grenada'
  | 'Guatemala'
  | 'Guinea'
  | 'Guinea-Bissau'
  | 'Guyana'
  | 'Haiti'
  | 'Honduras'
  | 'Hungary'
  | 'Iceland'
  | 'India'
  | 'Indonesia'
  | 'Iran'
  | 'Iraq'
  | 'Ireland'
  | 'Israel'
  | 'Italy'
  | 'Jamaica'
  | 'Japan'
  | 'Jordan'
  | 'Kazakhstan'
  | 'Kenya'
  | 'Kiribati'
  | 'Kuwait'
  | 'Kyrgyzstan'
  | 'Laos'
  | 'Latvia'
  | 'Lebanon'
  | 'Lesotho'
  | 'Liberia'
  | 'Libya'
  | 'Liechtenstein'
  | 'Lithuania'
  | 'Luxembourg'
  | 'Madagascar'
  | 'Malawi'
  | 'Malaysia'
  | 'Maldives'
  | 'Mali'
  | 'Malta'
  | 'Mauritania'
  | 'Mauritius'
  | 'Mexico'
  | 'Moldova'
  | 'Monaco'
  | 'Mongolia'
  | 'Montenegro'
  | 'Morocco'
  | 'Mozambique'
  | 'Myanmar'
  | 'Namibia'
  | 'Nauru'
  | 'Nepal'
  | 'Netherlands'
  | 'New Zealand'
  | 'Nicaragua'
  | 'Niger'
  | 'Nigeria'
  | 'North Korea'
  | 'North Macedonia'
  | 'Norway'
  | 'Oman'
  | 'Pakistan'
  | 'Palau'
  | 'Panama'
  | 'Papua New Guinea'
  | 'Paraguay'
  | 'Peru'
  | 'Philippines'
  | 'Poland'
  | 'Portugal'
  | 'Qatar'
  | 'Romania'
  | 'Russia'
  | 'Rwanda'
  | 'Saudi Arabia'
  | 'Senegal'
  | 'Serbia'
  | 'Singapore'
  | 'Slovakia'
  | 'Slovenia'
  | 'South Africa'
  | 'South Korea'
  | 'Spain'
  | 'Sri Lanka'
  | 'Sudan'
  | 'Sweden'
  | 'Switzerland'
  | 'Turkey'
  | 'Ukraine'
  | 'United Arab Emirates'
  | 'United Kingdom'
  | 'United States'
  | 'Vietnam'
  | 'Yemen'
  | 'Zambia'
  | 'Zimbabwe';

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
  contactiInfo: TContactInfo;
  pasportDetails: TPassportDetails;
  visaDetails: TVisaDetails;
  eussDetails: TEussDetails;
  dbsDetails: TDBSDetails;
  nationalIdDetails: TNationalIdDetails;
  otherDetails: TOtherDetails[];
  payDetails: TPayDetails;
  payStructure: TPayStructure;
};
