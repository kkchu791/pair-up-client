import {
  createBlock as createBlockApi,
  removeBlock as removeBlockApi,
  updateBlock as updateBlockApi,
} from '../../api'
import {
  removeBlocksByDate,
  insertBlocksByDate,
} from './blocksByDate';
import {
  updateActionBlock,
  removeActionBlock,
  insertActionBlock,
} from './blocks';

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
      const updatedBlock = response.data;

      if (updatedBlock.time_block_id) {
        dispatch(insertBlocksByDate({
          block: updatedBlock,
          date
        }));

        dispatch(removeActionBlock(updatedBlock));
      } else {
        dispatch(removeBlocksByDate({
          block: updatedBlock,
          date
        }));

        const actionBlockIds = getState().blocks.actionBlocks.map(bl => bl.id);
        if (actionBlockIds.includes(updatedBlock.id)) {
          dispatch(updateActionBlock(updatedBlock));
        } else {
          dispatch(insertActionBlock(updatedBlock));
        }
      }
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
        dispatch(removeActionBlock(removedBlock))
      } else {
        onError(response.error);
      }
    });
  };
}