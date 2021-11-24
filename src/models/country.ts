import { Companies } from "../store/actions/map";

export interface Country {
  location?: string,
  company1?: number,
  company2?: number,
  company3?: number,
  total?: number,
  opacity?: number,
  payload?: Companies,
}