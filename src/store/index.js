import { applyFlexMiddleware, FlexReducer } from "@twilio/flex-ui";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { jabraReducer } from "./reducer";

export * from "./actions";

// Create a redux store, and export it for use thoughout the application
export const store = createStore(
  combineReducers({
    jabra: jabraReducer,
    flex: FlexReducer
  }),
  // Add the redux thunk middleware, to allow for async actions
  compose(applyMiddleware(thunk))
);
