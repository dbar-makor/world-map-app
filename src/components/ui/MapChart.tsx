import React, { memo, useContext } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import { SELECT_COUNTRY } from "../../store/actions/map";
import MapContext from "../../store/map-context";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = () => {
  const { countriesState, dispatch } = useContext(MapContext);

  return (
    <React.Fragment>
      <ComposableMap data-tip="" projectionConfig={{ scale: 150 }}>
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
                          ? countriesState?.color
                          : "#b9b9bd",
                        outline: "none",
                        opacity: countriesState!.countriesData[
                          geo.properties.NAME
                        ]?.opacity
                          ? Number(
                              countriesState!.countriesData[geo.properties.NAME]
                                ?.opacity,
                            ) + "%"
                          : undefined,
                      },
                      hover: {
                        fill: countriesState?.color,
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
