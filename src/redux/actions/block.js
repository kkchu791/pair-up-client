import {
  createBlock as createBlockApi,
  removeBlock as removeBlockApi,
  updateBlock as updateBlockApi,
} from '../../api'
import {
  updateBlocksByDate,
  removeBlocksByDate,
  insertBlocksByDate,
} from './blocksByDate';

export const SET_BLOCK = 'SET_BLOCK';

export const setBlock = (block) => ({
  type: SET_BLOCK,
  block
});

export const createBlock = ({
    creator_id,
    time_block_id,
    date,
    task,
    goal_id,
    note,
    onSuccess,
    onError,
}) => {
  return async (dispatch, getState) => {
    return createBlockApi({
      creator_id,
      time_block_id,
      date,
      task,
      goal_id,
      note,
    }).then((response) => {
      if (response.success) {
        onSuccess(response);
        const newBlock = response.data;
        dispatch(insertBlocksByDate({
          block: newBlock,
          date
        }));
      } else {
        onError(response.error);
      }
    });
  };
}

export const updateBlock = ({
  id,
  creator_id,
  time_block_id,
  date,
  task,
  goal_id,
  note,
  images,
  onSuccess,
  onError,
}) => {
return async (dispatch, getState) => {
  return updateBlockApi({
    id,
    creator_id,
    time_block_id,
    date,
    task,
    goal_id,
    note,
    images,
  }).then((response) => {
    if (response.success) {
      onSuccess(response);
      const updatedBlock = response.data
      dispatch(updateBlocksByDate({
        block: updatedBlock,
        date
      }));
    } else {
      onError(response.error);
    }
  });
};
}

export const deleteBlock = ({
  userId,
  blockId,
  date,
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    return removeBlockApi({
      userId,
      blockId,
    }).then((response) => {
      if (response.success) {
        onSuccess(response);
        const removedBlock = response.data;
        dispatch(removeBlocksByDate({
          block: removedBlock,
          date
        }));
      } else {
        onError(response.error);
      }
    });
  };
}