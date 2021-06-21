export const SET_TIMER = "SET_TIMER";

export const setTimer = (payload) => ({
  type: SET_TIMER,
  status: payload.status,
});