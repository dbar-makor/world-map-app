import * as actions from '../actions/map';
import { Country } from '../../models/country';

const countriesData: {[key: string]: Country} = { };
const countries: Country[] = [
  {
    location: 'United Kingdom',
    company1: 10,
    company2: undefined,
    company3: undefined,
  },
  {
    location: 'France',
    company1: 23,
    company2: 12,
    company3: undefined,
  },
    {
    location: 'Israel',
    company1: 32,
    company2: 53,
    company3: 12,
  },
  {
    location: 'Russia',
    company1: undefined,
    company2: 5,
    company3: 34,
  },
  {
    location: 'Australia',
    company1: 21,
    company2: 12,
    company3: undefined,
  },
  {
    location: 'South Africa',
    company1: 32,
    company2: 12,
    company3: 32,
  },
];

export interface State {
  country: Country | null;
}

const initialState: State = {
  country: null,
};

export const reducer = (state: State = initialState, action: actions.CompanyTypes): State => {
  if (action.type === 'Companies') {
    // Get the total amount of countries
    const countriesWithTotal = countries.map((country) => {
      let { company1, company2, company3 } = country;

      if (typeof company1 === 'undefined') {
        company1 = 0;
      }
      if (typeof company2 === 'undefined') {
        company2 = 0;
      }
      if (typeof company3 === 'undefined') {
        company3 = 0;
      }
      
      return { ...country, total: (company1 + company2 + company3) }
    });

    // Get the highest total amount of countries
    const max = countriesWithTotal.reduce((acc, country) => acc = acc > country.total ? acc : country.total, 0);

    // Initialize countries data 
    for (const country of countriesWithTotal) {
      const countryName = country.location;
      countriesData[countryName!] = { ...country, opacity: 100 * country.total / max }
    };

    console.log(state, action)

    return { ...state, country: countriesData }
  }

  return { ...state, country: action.payload.country }
};