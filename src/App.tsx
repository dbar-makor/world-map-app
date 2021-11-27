import React, { memo, useReducer } from "react";

import { initialState, mapReducer } from "./store/reducers/map";
import MapContext from "../src/store/map-context";

import AppView from "./App.view";

interface Props {}

const App: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  const [countriesState, dispatch] = useReducer(mapReducer, initialState);

  return (
    <MapContext.Provider value={{ countriesState, dispatch }}>
      <AppView></AppView>
    </MapContext.Provider>
  );
};

App.displayName = "App";
App.defaultProps = {};

export default memo(App);
