import {getActionBlocks as getActionBlocksApi} from '../../api';

export const SET_ACTION_BLOCKS = 'SET_ACTION_BLOCKS';
export const INSERT_ACTION_BLOCK = 'INSERT_ACTION_BLOCK';
export const UPDATE_ACTION_BLOCK = 'UPDATE_ACTION_BLOCK';
export const REMOVE_ACTION_BLOCK = 'REMOVE_ACTION_BLOCK';

export const setActionBlocks = (payload) => ({
  type: SET_ACTION_BLOCKS,
  blocks: payload
});

export const insertActionBlock = (payload) => ({
  type: INSERT_ACTION_BLOCK,
  block: payload,
});

export const updateActionBlock = (payload) => ({
  type: UPDATE_ACTION_BLOCK,
  block: payload,
});

export const removeActionBlock = (payload) => ({
  type: REMOVE_ACTION_BLOCK,
  block: payload,
});

export const getActionBlocks = ({
  userId,
  goalId,
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    return await getActionBlocksApi({
      userId,
      goalId,
    }).then((response) => {
      if (response.success) {
        dispatch(setActionBlocks(response.data));
        onSuccess();
      } else {
        onError(response.error);
      }
    });
  };
}