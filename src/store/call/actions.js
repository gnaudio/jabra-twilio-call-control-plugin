export const SET_CALL_STATE = "SET_CALL_STATE";

// Set call state, and store reservation for use globally
export const setCallState = (state, reservation = null) => ({
  type: SET_CALL_STATE,
  payload: { state, reservation }
});
