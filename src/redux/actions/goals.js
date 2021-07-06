import {
  getGoal as getGoalApi,
  getGoals as getGoalsApi,
  updateGoal as updateGoalApi,
  createGoal as createGoalApi,
  removeGoal as removeGoalApi,
} from '../../api';

export const SET_GOAL = 'SET_GOAL';
export const SET_GOALS = 'SET_GOALS';
export const SET_GOAL_OPTIONS = 'SET_GOAL_OPTIONS';
export const UPDATE_GOALS_LIST = 'UPDATE_GOALS_LIST';
export const REMOVE_GOAL_FROM_LIST = 'REMOVE_GOAL_FROM_LIST';


export const setGoal = (payload) => ({
  type: SET_GOAL,
  goal: payload
});

export const setGoals = (payload) => ({
  type: SET_GOALS,
  goals: payload
});

export const setGoalOptions = (payload) => ({
  type: SET_GOAL_OPTIONS,
  goals: payload
});

export const updateGoalsList = (payload) => ({
  type: UPDATE_GOALS_LIST,
  goal: payload,
});

export const removeGoalFromList = (payload) => ({
  type: REMOVE_GOAL_FROM_LIST,
  id: payload,
});

export const getGoal = ({
  id,
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    return await getGoalApi({
      id
    }).then((response) => {
      if (response.success) {
        dispatch(setGoal(response.goal));
        onSuccess();
      } else {
        onError(response.error);
      }
    });
  };
}

export const getGoals = ({
  userId,
  type,
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    return await getGoalsApi({
      userId,
      type,
    }).then((response) => {
      if (response.success) {
        dispatch(setGoals(response.goals));
        dispatch(setGoalOptions(response.goals));
        onSuccess();
      } else {
        onError(response.error);
      }
    });
  };
}

export const createGoal= ({
  color,
  name,
  userId,
  type,
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    return await createGoalApi({
      color,
      name,
      userId,
      type,
    }).then((response) => {
      if (response.success) {
        dispatch(updateGoalsList(response.data));
        onSuccess();
      } else {
        onError(response.error);
      }
    });
  };
}

export const updateGoal= ({
  id,
  note,
  coachesNote,
  color,
  name,
  type,
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    return await updateGoalApi({
      id,
      note,
      coachesNote,
      type,
      color,
      name,
    }).then((response) => {
      if (response.success) {
        dispatch(setGoal(response.data));
        dispatch(updateGoalsList(response.data));
        onSuccess();
      } else {
        onError(response.error);
      }
    });
  };
}

export const removeGoal= ({
  id,
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    return await removeGoalApi({
      id
    }).then((response) => {
      if (response.success) {
        dispatch(removeGoalFromList(response.data));
        onSuccess();
      } else {
        onError(response.error);
      }
    });
  };
}