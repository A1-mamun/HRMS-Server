import {
  TDaysOfWeek,
  TNameOfSector,
  TOrganisationType,
  TTradingPeriod,
} from './employer.interface';

export const OrganisationTypes: TOrganisationType[] = [
  'Private Company Limited by Shares',
  'Charitable Incorporated Organisation',
  'Industrial and Provident Society',
  'General Partnership',
  'Limited Partnership',
  'Limited Liability Partnership',
  'Sole Proprietorship',
  'Public Limited Company',
  'Private Company Limited by Guarantee',
  'Community Interest Company',
  'Unincorporated Association',
  'Other',
];

export const TradingPeriod: TTradingPeriod[] = [
  '0 to 6 months',
  'Over 6 to 12 months',
  'Over 12 to 18 months',
  'Over 18 to 36 months',
  'Over 36 months +',
];

export const SectorsName: TNameOfSector[] = [
  'Agriculture, Forestry and Fishing',
  'Mining and Quarrying',
  'Manufacturing',
  'Electricity, Gas, Steam and Air Conditioning Supply',
  'Water Supply; Sewerage, Waste Management and Remediation Activities',
  'Construction',
  'Wholesale and Retail Trade; Repair of Motor Vehicles and Motorcycles',
  'Transportation and Storage',
  'Accommodation and Food Service Activities',
  'Information and Communication',
  'Financial and Insurance Activities',
  'Real Estate Activities',
  'Professional, Scientific and Technical Activities',
  'Administrative and Support Service Activities',
  'Public Administration and Defence; Compulsory Social Security',
  'Education',
  'Human Health and Social Work Activities',
  'Arts, Entertainment and Recreation',
  'Activities of Households as Employers; Undifferentiated Goods- and Services-Producing Activities of Households for Own Use',
  'Activities of Extraterritorial Organizations and Bodies',
  'Other Service Activities',
];

export const DaysOfWeek: TDaysOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
