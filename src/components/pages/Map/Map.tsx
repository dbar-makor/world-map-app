import React from "react";

import MapChartView from "./Map.view";

interface Props { }

const Map: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {

  return (
    <MapChartView>{props.children}</MapChartView>
  );
};

Map.displayName = "Map";
Map.defaultProps = {};

export default Map;