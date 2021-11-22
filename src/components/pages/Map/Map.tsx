import React, { useEffect, useState } from 'react';

import MapChartView from './Map.view';

import { Country } from '../../../models/country';

interface Props { };

const countriesData: {[key: string]: Country} = { };
const countries: Country[] = [
  {
    location: 'United Kingdom',
    company1: [10, '#fff'],
    company2: undefined,
    company3: undefined,
  },
  {
    location: 'France',
    company1: [10, '#fff'],
    company2: [10, { color: '#fff' }],
    company3: undefined,
  },
    {
    location: 'Israel',
    company1: [10, { color: '#fff' }],
    company2: [10, { color: '#fff' }],
    company3: [10, { color: '#fff' }],
  },
  {
    location: 'Russia',
    company1: undefined,
    company2: [10, { color: '#fff' }],
    company3: [10, { color: '#fff' }],
  },
  {
    location: 'Australia',
    company1: [10, { color: '#fff' }],
    company2: [10, { color: '#fff' }],
    company3: [10, { color: '#fff' }],
  },
  {
    location: 'South Africa',
    company1: [10, { color: '#fff' }],
    company2: [10, { color: '#fff' }],
    company3: [10, { color: '#fff' }],
  },
];

const Map: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const [ selectedCountryState, setSelectedCountryState ] = useState<Country | null>(null);
  const [ companyState, useCompanyState ] = useState<string>('');
  
  useEffect(() => {
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
    }
  }, []);

  const getCountryData = (countryName: string): Country => {
    return countriesData[countryName];
  }

  const setCountryData = (countryName: string) =>{
    setSelectedCountryState(() => countriesData[countryName])
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