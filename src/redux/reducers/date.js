import {
  SET_DATE,
} from '../actions';

const initialState = new Date();

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return action.date;
    default:
      return state;
  }
};

export default dateReducer;