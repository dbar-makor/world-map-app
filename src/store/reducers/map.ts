import * as actions from "../actions/map";

import produce from "immer";

import { backendAPIAxios } from "../../utils/http";
import { AxiosError, AxiosResponse } from "axios";

import { Country } from "../../models/country";

import { IGetCountriesDataResponse } from "../../models/response";

// const countries: Country[] = [
//   {
//     location: "United Kingdom",
//     company1: 10,
//     company2: undefined,
//     company3: undefined,
//   },
//   {
//     location: "Japan",
//     company1: 10,
//     company2: 34,
//     company3: undefined,
//   },
//   {
//     location: "Indonesia",
//     company1: 10,
//     company2: undefined,
//     company3: 65,
//   },
//   {
//     location: "Papua New Guinea",
//     company1: 10,
//     company2: 12,
//     company3: undefined,
//   },
//   {
//     location: "Chad",
//     company1: 10,
//     company2: undefined,
//     company3: 98,
//   },
//   {
//     location: "France",
//     company1: 23,
//     company2: 12,
//     company3: undefined,
//   },
//   {
//     location: "United States of America",
//     company1: 23,
//     company2: undefined,
//     company3: undefined,
//   },
//   {
//     location: "Canada",
//     company1: 32,
//     company2: undefined,
//     company3: 98,
//   },
//   {
//     location: "Brazil",
//     company1: 23,
//     company2: 12,
//     company3: undefined,
//   },
//   {
//     location: "Israel",
//     company1: 32,
//     company2: undefined,
//     company3: 12,
//   },
//   {
//     location: "Russia",
//     company1: undefined,
//     company2: 5,
//     company3: 34,
//   },
//   {
//     location: "Australia",
//     company1: 21,
//     company2: 12,
//     company3: undefined,
//   },
//   {
//     location: "China",
//     company1: undefined,
//     company2: 12,
//     company3: undefined,
//   },
//   {
//     location: "Sudan",
//     company1: 31,
//     company2: undefined,
//     company3: 8,
//   },
//   {
//     location: "Algeria",
//     company1: 54,
//     company2: undefined,
//     company3: undefined,
//   },
//   {
//     location: "South Africa",
//     company1: undefined,
//     company2: 12,
//     company3: 32,
//   },
// ];

let countriesDataFromServer: Country[];

backendAPIAxios.get('/countries')
  .then((response: AxiosResponse<IGetCountriesDataResponse>) => {
    if (!response.data.data) {
      return alert(`Failed to add movie with error: ${response.data.message}`)
    }

    countriesDataFromServer = response.data.data;
  })
  .catch((e: AxiosError) => {
    return alert(`Failed to run with error: ${e}`);
  });

const transformData = (
  countriesDataFromServer: Country[],
  selection: "total" | "company1" | "company2" | "company3" = "total",
) => {
  // Get the total amount of countries
  const countriesWithTotal = countriesDataFromServer.map((country) => {
    let { company1, company2, company3 } = country;

    switch (selection) {
      case 'company1':
        company2 = 0;
        company3 = 0;
      break;
      case 'company2':
        company1 = 0;
        company3 = 0;
      break;
      case 'company3':
        company1 = 0;
        company2 = 0;
      break;
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

    return {
      ...country,
      company1,
      company2,
      company3,
      total: company1 + company2 + company3,
    };
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
  color: string;
}

const countries: Country[] = [];
export const initialState: State = {
  countriesData: transformData(countries),
  countryName: "",
  color: "",
};

export const mapReducer = produce(
  (countriesState: State = initialState, action: actions.CompanyTypes) => {
    switch (action.type) {
      case "SELECT_COUNTRY":
        countriesState.countryName = action.payload.countryName;
        break;
      case "CHANGE_SELECTION":
        const countriesData = transformData(
          countriesDataFromServer,
          action.payload.selection,
        );

        countriesState.countriesData = countriesData;

        const colors = {
          total: "#773344",
          company1: "#044389",
          company2: "#CC5F00",
          company3: "#566E3D",
        };

        countriesState.color = colors[action.payload.selection];
        break;
    }
  },
);
