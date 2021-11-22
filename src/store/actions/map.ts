import { Country } from '../../models/country';

export const COMPANIES = 'Companies';
export const COMPANY = 'Company';

// --- Interface --- //

export interface Companies {
  type: typeof COMPANIES;
  payload: { country: Country };
}

export interface Company {
  type: typeof COMPANIES;
  payload: { country: Country };
}

export type CompanyTypes = Companies | Company;
