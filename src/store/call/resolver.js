import { SET_CALL_STATE } from "./actions";

const initialState = {
  state: "none",
  reservation: null
};

export function call(state = initialState, action) {
  switch (action.type) {
    case SET_CALL_STATE:
      return {
        ...state,
        state: action.payload
      };

    default:
      return state;
  }
}
