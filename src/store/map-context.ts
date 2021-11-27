import { createContext, Dispatch } from "react";
import { CompanyTypes } from "./actions/map";

import { initialState, State } from "./reducers/map";

const MapContext = createContext<{
  countriesState: State | undefined;
  dispatch: Dispatch<CompanyTypes>;
}>({
  countriesState: initialState,
  dispatch: () => null,
});

export default MapContext;
