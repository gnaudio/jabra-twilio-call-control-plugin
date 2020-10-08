import {
  LOAD_DEVICES,
  SET_ACTIVE_DEVICE,
  REMOVE_ACTIVE_DEVICE,
  SET_MMI_FOCUS,
  REMOVE_MMI_FOCUS
} from "./actions";
import { jabra } from "../../jabra";

const initialState = {
  items: [],
  active: null,
  mmi: true,
  analytics: {}
};

export function devices(state = initialState, action) {
  switch (action.type) {
    case LOAD_DEVICES:
      if (action.status === "success")
        return {
          ...state,
          items: action.payload
        };
      break;

    case SET_ACTIVE_DEVICE:
      if (action.status === "success") {
        let newState = {
          ...state,
          active: action.payload
        };

        if (!state.analytics.hasOwnProperty(action.payload.deviceID)) {
          newState.analytics = {
            ...state.analytics,
            [action.payload.deviceID]: new jabra.Analytics(
              action.payload.deviceID
            )
          };
        }

        return newState;
          }
          break;

    case REMOVE_ACTIVE_DEVICE:
      return {
        ...state,
          active: null
          };
          break;

    case SET_MMI_FOCUS:
      if (action.status === "success")
        return {
          ...state,
          mmi: true
        };

      if (action.status === "error")
        return {
          ...state,
          mmi: false
        };
      break;

    case REMOVE_MMI_FOCUS:
      return {
        ...state,
        mmi: false
          };
          break;

    default:
          return state;
          break;
  }
}
