import * as actions from "../actions/map";

import { Country } from "../../models/country";

import produce from "immer";

const countries: Country[] = [
  {
    location: "United Kingdom",
    company1: 10,
    company2: undefined,
    company3: undefined,
  },
  {
    location: "France",
    company1: 23,
    company2: 12,
    company3: undefined,
  },
  {
    location: "Israel",
    company1: 32,
    company2: 53,
    company3: 12,
  },
  {
    location: "Russia",
    company1: undefined,
    company2: 5,
    company3: 34,
  },
  {
    location: "Australia",
    company1: 21,
    company2: 12,
    company3: undefined,
  },
  {
    location: "South Africa",
    company1: 32,
    company2: 12,
    company3: 32,
  },
];

const transformData = (
  countries: Country[],
  selection: "total" | "company1" | "company2" | "company3" = "total",
) => {
  // Get the total amount of countries
  const countriesWithTotal = countries.map((country) => {
    let { company1, company2, company3 } = country;

    if (selection === "company1") {
      company2 = 0;
      company3 = 0;
    } else if (selection === "company2") {
      company1 = 0;
      company3 = 0;
    } else if (selection === "company3") {
      company1 = 0;
      company3 = 0;
    }

    if (typeof company1 === "undefined") {
      company1 = 0;
    }
    if (typeof company2 === "undefined") {
      company2 = 0;
    }
    if (typeof company3 === "undefined") {
      company3 = 0;
    }

    return { ...country, total: company1 + company2 + company3 };
  });

  // Get the highest total amount of countries
  const max = countriesWithTotal.reduce(
    (acc, country) => (acc = acc > country.total ? acc : country.total),
    0,
  );

  const countriesData: { [key: string]: Country } = {};

  // Initialize countries data
  for (const country of countriesWithTotal) {
    const countryName = country.location;
    countriesData[countryName!] = {
      ...country,
      opacity: (100 * country.total) / max,
    };
  }

  return countriesData;
};

export interface State {
  countriesData: { [key: string]: Country };
  countryName: string;
}

export const initialState: State = {
  countriesData: transformData(countries),
  countryName: "",
};

// export const mapReducer = produce(
//   (countriesState: State = initialState, action: actions.CompanyTypes) => {
//     switch (action.type) {
//       case "SELECT_COUNTRY":
//         countriesState.countryName = action.payload.countryName;
//         break;
//       case "CHANGE_SELECTION":
//         const countriesData = transformData(countries);

//         countriesState.countriesData = countriesData;
//         break;
//     }
//   },
// );

export const mapReducer = (
  state: State = initialState,
  action: actions.CompanyTypes,
): State => {
  switch (action.type) {
    case actions.SELECT_COUNTRY:
      return { ...state, countryName: action.payload.countryName };
    default:
      return state;
  }
};
