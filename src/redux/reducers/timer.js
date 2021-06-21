import { SET_TIMER } from '../actions';

const initialState = {status: ''};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMER:
      return {...state, ...{status: action.status}};
    default:
      return state;
  }
};

export default timerReducer;