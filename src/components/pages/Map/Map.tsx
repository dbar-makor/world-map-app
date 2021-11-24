import React, { useEffect, useReducer, useState } from 'react';

import MapChartView from './Map.view';

import { Country } from '../../../models/country';
import { reducer, initialState } from '../../../store/reducers/map';

interface Props { };

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

const Map: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  // const [ selectedCountryState, setSelectedCountryState ] = useState<Country | null>(null);

  const [ selectedCountryState, dispatch ] = useReducer(reducer, initialState);
  
  // useEffect(() => {
  //   // Get the total amount of countries
  //   const countriesWithTotal = countries.map((country) => {
  //     let { company1, company2, company3 } = country;

  //     if (typeof company1 === 'undefined') {
  //       company1 = 0;
  //     }
  //     if (typeof company2 === 'undefined') {
  //       company2 = 0;
  //     }
  //     if (typeof company3 === 'undefined') {
  //       company3 = 0;
  //     }
      
  //     return { ...country, total: (company1 + company2 + company3) }
  //   });

  //   // Get the highest total amount of countries
  //   const max = countriesWithTotal.reduce((acc, country) => acc = acc > country.total ? acc : country.total, 0);

  //   // Initialize countries data 
  //   for (const country of countriesWithTotal) {
  //     const countryName = country.location;
  //     countriesData[countryName!] = { ...country, opacity: 100 * country.total / max }
  //   }
  // }, []);

  const getCountryData = (countryName: string): Country => {
    return countriesData[countryName];
  }

  const setCountryData = (countryName: string) =>{
    // dispatch(() => countriesData[countryName])
  };

  return (
    <MapChartView
        {...selectedCountryState}
        getCountryData={getCountryData}
        setCountryData={setCountryData}
    >{props.children}</MapChartView>
  );
};

Map.displayName = 'Map';
Map.defaultProps = {};

export default Map;