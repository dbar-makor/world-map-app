import React, { useReducer } from 'react';
import ReactTooltip from "react-tooltip";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { reducer, initialState, State } from '../../../store/reducers/map';

import { Country } from '../../../models/country'

import MapChart from '../../ui/MapChart';

import classes from './Map.module.scss';

interface Props {
  readonly location?: string;
  readonly company1?: number;
  readonly company2?: number;
  readonly company3?: number;
  readonly countriesState?: State;
};

const MapView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {

  const [ countriesState, dispatch ] = useReducer(reducer, initialState);

  // console.log(countriesState?.countryName);
  console.log(countriesState!.countriesData);

  return (
    <div>
      <div className={classes['navWrapper']}>
        <Stack direction='row' className={classes['btnWrapper']}>
          <Button type="button">All Companies</Button>
          <Button type="button" className={classes['btnWrapper__company1']}>Company 1</Button>
          <Button type="button" className={classes['btnWrapper__company2']}>Company 2</Button>
          <Button type="button" className={classes['btnWrapper__company3']}>Company 3</Button>
        </Stack>
      </div>
      <MapChart/>
        {props.location && (<ReactTooltip>
          {props.location ? props.location : 'No Data'}
          <br />
          <div className={classes['blue']}>
            {!props.company1 ? '' : 'Company1: ' + props.company1}
          </div>
          <div className={classes['red']}>
            {!props.company2 ? '' : 'Company2: ' + props.company2}
          </div>
          <div className={classes['green']}>
            {!props.company3 ? '' : 'Company2: ' + props.company3}
          </div>
        </ReactTooltip>)}
    </div>
  );
};

MapView.displayName = 'MapView';
MapView.defaultProps = {};

export default MapView;