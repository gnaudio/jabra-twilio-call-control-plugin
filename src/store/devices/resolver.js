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
      if (action.status === "success")
        return {
          ...state,
          active: action.payload,
          analytics: {
            ...state.analytics,
            [action.payload.deviceID]: new jabra.Analytics(
              action.payload.deviceID
            )
          }
        };
      break;

    case REMOVE_ACTIVE_DEVICE:
      return {
        ...state,
        active: null
      };

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

    default:
      return state;
  }
}
