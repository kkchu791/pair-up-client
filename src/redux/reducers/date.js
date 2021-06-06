import {
  SET_DATE,
} from '../actions';
import {format} from 'date-fns';

const currDate = format(new Date(), 'yyyy-MM-dd');
const initialState = {currentDate: new Date(`${currDate} 00:00:00`)};

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return {...state, ...{currentDate: action.date}};
    default:
      return state;
  }
};

export default dateReducer;