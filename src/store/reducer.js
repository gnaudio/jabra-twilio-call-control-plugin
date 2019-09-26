import { combineReducers } from "redux";

import { call } from "./call/resolver";
import { devices } from "./devices/resolver";
import { sdk } from "./sdk/resolver";

// Combine the different reducers into out rootReducer
export const jabraReducer = combineReducers({
  sdk,
  call,
  devices
});
