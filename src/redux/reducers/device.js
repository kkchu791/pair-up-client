import { SET_DEVICE } from '../actions';
import { DEVICE_TYPES } from '../../constants';

const initialState = { 
  type: DEVICE_TYPES.DESKTOP
};

const deviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEVICE:
      return { ...state, ...action.payload};
    default:
      return state;
  }
};

export default deviceReducer;