import {
  SET_GOALS,
  SET_GOAL_OPTIONS,
  SET_GOAL,
  UPDATE_GOALS_LIST,
  REMOVE_GOAL_FROM_LIST,
} from '../actions';

const initialState = {
  currentGoal: {},
  list: [],
};

const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GOALS:
      return {...state, ...{list: action.goals}};
    case SET_GOAL_OPTIONS:
      const goalOptions = action.goals.map(goal => ({
        label: goal.name,
        value: goal.id
      }));
      return {...state, ...{goalOptions}};
    case SET_GOAL:
      const newGoal = {...state.currentGoal, ...action.goal};
      return {...state, ...{currentGoal: newGoal}};
    case UPDATE_GOALS_LIST:
      const goal = action.goal;
      const listIds = state.list.map(g => g.id);
      let newList;
      if (listIds.includes(goal.id)) {
          newList = state.list.map(g => {
            if (g.id === goal.id) {
              return Object.assign(g, goal);
            } else {
              return g;
            }
          })
      } else {
        newList = [...state.list, goal];
      }
      return {...state, ...{list: newList}};
    case REMOVE_GOAL_FROM_LIST:
      const removedList = state.list.filter(goal => goal.id !== action.id);
      return {...state, ...{list: removedList}};
    default:
      return state;
  }
};

export default goalsReducer;