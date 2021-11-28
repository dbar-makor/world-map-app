import React, { useContext } from "react";

import ReactTooltip from "react-tooltip";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import MapContext from "../../../store/map-context";
import { CHANGE_SELECTION } from "../../../store/actions/map";

import { Country } from "../../../models/country";

import MapChart from "../../ui/MapChart";

import classes from "./Map.module.scss";

interface Props {
  readonly countriesData?: { [key: string]: Country };
  readonly countryName?: string;
}

const MapView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const { countriesState, dispatch } = useContext(MapContext);

  const country = countriesState!.countriesData[countriesState!.countryName];

  let total, company1, company2, company3, location;

  if (country) {
    ({ total, company1, company2, company3, location } = country);
  }

  return (
    <div>
      <div className={classes["navWrapper"]}>
        <Stack direction="row" className={classes["btnWrapper"]}>
          <Button
            sx={{
                color: '#000',
                ':hover': {
                  color: '#fff'
                }
            }}
            style={{
              backgroundColor: "#773344",
            }}
            onClick={() =>
              dispatch({
                type: CHANGE_SELECTION,
                payload: { selection: "total" },
              })
            }
            type="button"
          >
            All Companies
          </Button>
          <Button
            sx={{
              color: '#000',
              ':hover': {
                color: '#fff'
              }
            }}
            style={{
              backgroundColor: "#044389",
            }}
            onClick={() =>
              dispatch({
                type: CHANGE_SELECTION,
                payload: { selection: "company1" },
              })
            }
            type="button"
            className={classes["btnWrapper__company1"]}
          >
            Company 1
          </Button>
          <Button
            sx={{
              color: '#000',
              ':hover': {
                color: '#fff'
              }
            }}
            style={{
              backgroundColor: "#CC5F00",
            }}
            onClick={() =>
              dispatch({
                type: CHANGE_SELECTION,
                payload: { selection: "company2" },
              })
            }
            type="button"
            className={classes["btnWrapper__company2"]}
          >
            Company 2
          </Button>
          <Button
            sx={{
              color: '#000',
              ':hover': {
                color: '#fff'
              }
            }}
            style={{
              backgroundColor: "#566E3D",
            }}
            onClick={() =>
              dispatch({
                type: CHANGE_SELECTION,
                payload: { selection: "company3" },
              })
            }
            type="button"
            className={classes["btnWrapper__company3"]}
          >
            Company 3
          </Button>
        </Stack>
      </div>
      <MapChart />
      {total && (
        <ReactTooltip>
          {location}
          <br />
          <div className={classes["blue"]}>
            {!company1 ? "" : "Company 1: " + company1}
          </div>
          <div className={classes["orange"]}>
            {!company2 ? "" : "Company 2: " + company2}
          </div>
          <div className={classes["green"]}>
            {!company3 ? "" : "Company 3: " + company3}
          </div>
        </ReactTooltip>
      )}
    </div>
  );
};

MapView.displayName = "MapView";
MapView.defaultProps = {};

export default MapView;
