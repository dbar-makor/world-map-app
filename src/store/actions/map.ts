export const CHANGE_SELECTION = "CHANGE_SELECTION";
export const SELECT_COUNTRY = "SELECT_COUNTRY";

export enum SELECTION_TYPES {
  Total = "total",
}

// --- Interface --- //

export interface CHANGE_SELECTION_ACTION {
  type: typeof CHANGE_SELECTION;
  payload: { selection: "total" | "company1" | "company2" | "company3" };
}

export interface SELECT_COUNTRY_ACTION {
  type: typeof SELECT_COUNTRY;
  payload: { countryName: string };
}

export type CompanyTypes = CHANGE_SELECTION_ACTION | SELECT_COUNTRY_ACTION;
