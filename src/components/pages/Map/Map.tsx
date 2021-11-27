import React, { useReducer } from "react";

import MapChartView from "./Map.view";

import { Country } from "../../../models/country";
import { initialState, mapReducer } from "../../../store/reducers/map";

interface Props {}

const countriesData: { [key: string]: Country } = {};
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

const Map: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const [countriesState] = useReducer(mapReducer, initialState);

  console.log(countriesState?.countryName);

  return (
    <MapChartView
      countriesData={countriesState?.countriesData}
      countryName={countriesState?.countryName}
    >
      {props.children}
    </MapChartView>
  );
};

Map.displayName = "Map";
Map.defaultProps = {};

export default Map;
