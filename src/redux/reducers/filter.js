import { SET_FILTER } from '../actions';
import { FILTERS } from '../../constants';

const initialState = { 
  range: FILTERS.week
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, ...action.payload};
    default:
      return state;
  }
};

export default filterReducer;