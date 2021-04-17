import {
  SET_DATE,
} from '../actions';

const initialState = {currentDate: new Date()};

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return {...state, ...{currentDate: action.date}};
    default:
      return state;
  }
};

export default dateReducer;