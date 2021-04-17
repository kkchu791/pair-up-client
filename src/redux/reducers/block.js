import {
  SET_BLOCK,
} from '../actions';

  const initialState = null;
  const blockReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_BLOCK:
        return action.block;
      default:
        return state;
    }
  };
  
  export default blockReducer;