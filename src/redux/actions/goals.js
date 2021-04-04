import {
  getGoal as getGoalApi,
  getGoals as getGoalsApi,
  updateGoal as updateGoalsApi,
} from '../../api';

export const SET_GOAL = "SET_GOAL";
export const SET_GOALS = "SET_GOALS";

export const setGoal = (payload) => ({
  type: SET_GOAL,
  goal: payload
});

export const setGoals = (payload) => ({
  type: SET_GOALS,
  goals: payload
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

export const updateGoal= ({
  id,
  note,
  coachesNote,
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    return await updateGoalsApi({
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