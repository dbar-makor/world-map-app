import React, { memo, useReducer } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import { SELECT_COUNTRY } from "../../store/actions/map";

import { initialState, mapReducer } from "../../store/reducers/map";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = () => {
  const [countriesState, dispatch] = useReducer(mapReducer, initialState);

  return (
    <React.Fragment>
      <ComposableMap data-tip="" projectionConfig={{ scale: 180 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(
                (geo: {
                  rsmKey: React.Key | null | undefined;
                  properties: { NAME: string };
                }) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const countryName = geo.properties.NAME;

                      dispatch({
                        type: SELECT_COUNTRY,
                        payload: { countryName },
                      });
                      console.log(countryName + " in");
                    }}
                    onMouseLeave={() => {
                      dispatch({
                        type: SELECT_COUNTRY,
                        payload: { countryName: "" },
                      });
                    }}
                    style={{
                      default: {
                        fill: countriesState!.countriesData[geo.properties.NAME]
                          ?.opacity
                          ? "#C996CC"
                          : "#b9b9bd",
                        outline: "none",
                        opacity:
                          Number(
                            countriesState!.countriesData[geo.properties.NAME]
                              ?.opacity,
                          ) + "%",
                      },
                      hover: {
                        fill: "#C996CC",
                        outline: "none",
                      },
                    }}
                  />
                ),
              )
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </React.Fragment>
  );
};

export default memo(MapChart);
