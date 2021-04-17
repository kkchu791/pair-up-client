import {
  SET_GOALS,
  SET_GOAL,
  UPDATE_GOALS_LIST,
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
    case UPDATE_GOALS_LIST:
        const goal = action.goal;
        const listIds = state.list.map(g => g.id);
        let newList;
        if (listIds.includes(goal.id)) {
           // do update logic
           newList = state.list; //temp
        } else {
          newList = [...state.list, goal];
        }
        return {...state, ...{list: newList}};
    default:
      return state;
  }
};

export default goalsReducer;