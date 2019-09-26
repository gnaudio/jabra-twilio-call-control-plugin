export const SET_CALL_STATE = "SET_CALL_STATE";

export const setCallState = (state, reservation = null) => ({
  type: SET_CALL_STATE,
  payload: { state, reservation }
});
