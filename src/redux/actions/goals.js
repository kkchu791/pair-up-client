import {
  getGoal as getGoalApi,
  getGoals as getGoalsApi,
  updateGoal as updateGoalApi,
  createGoal as createGoalApi,
} from '../../api';

export const SET_GOAL = 'SET_GOAL';
export const SET_GOALS = 'SET_GOALS';
export const UPDATE_GOALS_LIST = 'UPDATE_GOALS_LIST';

export const setGoal = (payload) => ({
  type: SET_GOAL,
  goal: payload
});

export const setGoals = (payload) => ({
  type: SET_GOALS,
  goals: payload
});

export const updateGoalsList = (payload) => ({
  type: UPDATE_GOALS_LIST,
  goal: payload,
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
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    return await getGoalsApi({
      userId
    }).then((response) => {
      if (response.success) {
        dispatch(setGoals(response.goals));
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
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    return await createGoalApi({
      color,
      name,
      userId,
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
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    return await updateGoalApi({
      id,
      note,
      coachesNote,
    }).then((response) => {
      if (response.success) {
        dispatch(setGoal(response.data));
        onSuccess();
      } else {
        onError(response.error);
      }
    });
  };
}