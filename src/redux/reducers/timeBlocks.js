import {
  SET_TIME_BLOCKS,
} from '../actions';

const initialState = [];

const timeBlocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIME_BLOCKS:
      return action.payload;
    default:
      return state;
  }
};

export default timeBlocksReducer;