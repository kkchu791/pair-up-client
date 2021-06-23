import {
  SET_DATE,
} from '../actions';
import {format} from 'date-fns';

const initialState = {
  currentDateObj: new Date(),
  currentDateStr: format(new Date(), 'yyyy-MM-dd'), 
};

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return {...state, ...{currentDateObj: action.dateObj, currentDateStr: action.dateStr}};
    default:
      return state;
  }
};

export default dateReducer;