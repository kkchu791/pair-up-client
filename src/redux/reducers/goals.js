import {
  SET_GOALS,
  SET_GOAL,
} from '../actions';

const initialState = {
  currentGoal: {},
  list: [],
};

const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GOALS:
      return {...state, ...{list: action.goals}};
    case SET_GOAL:
      const newGoal = {...state.currentGoal, ...action.goal};
      return {...state, ...{currentGoal: newGoal}};
    default:
      return state;
  }
};

export default goalsReducer;