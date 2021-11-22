import React from 'react';
import ReactTooltip from "react-tooltip";

import { Country } from '../../../models/country'

import MapChart from '../../ui/MapChart/MapChart';

import classes from './Map.module.scss';

interface Props {
  readonly location?: string;
  readonly company1?: [number, {color: string}];
  readonly company2?: [number, {color: string}];
  readonly company3?: [number, {color: string}];
  readonly getCountryData: (countryName: string) => Country;
  readonly setCountryData: (countryName: string) => void;
};

const MapView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {

  return (
    <div>
      <div className={classes['navWrapper']}>
        <div className={classes['btnWrapper']}>
          <button type="button" className={classes['btnWrapper__companies']}>All Companies</button>
          <button type="button" className={classes['btnWrapper__company1']}>Company 1</button>
          <button type="button" className={classes['btnWrapper__company2']}>Company 2</button>
          <button type="button" className={classes['btnWrapper__company3']}>Company 3</button>
        </div>
      </div>
      <MapChart getCountryData={props.getCountryData} setTooltipContent={props.setCountryData}/>
        {props.location && (<ReactTooltip>
          {props.location ? props.location : 'No Data'}
          <br />
          <div className={classes['blue']}>
            Company1: {!props.company1 ? 'No Data' : props.company1}
          </div>
          <div className={classes['red']}>
            Company2: {!props.company2 ? 'No Data' : props.company2}
          </div>
          <div className={classes['green']}>
            Company3: {!props.company3 ? 'No Data' : props.company3}
          </div>
        </ReactTooltip>)}
    </div>
  );
};

MapView.displayName = 'MapView';
MapView.defaultProps = {};

export default MapView;