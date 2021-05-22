import {
  createBlock as createBlockApi,
  removeBlock as removeBlockApi,
  updateBlock as updateBlockApi,
  getActionBlocks as getActionBlocksApi,
} from '../../api'
import {
  removeBlocksByDate,
  insertBlocksByDate,
} from './blocksByDate';

export const SET_BLOCK = 'SET_BLOCK';
export const SET_ACTION_BLOCKS = 'SET_ACTION_BLOCKS';
export const INSERT_ACTION_BLOCK = 'INSERT_ACTION_BLOCK';
export const UPDATE_ACTION_BLOCK = 'UPDATE_ACTION_BLOCK';
export const REMOVE_ACTION_BLOCK = 'REMOVE_ACTION_BLOCK';

export const setBlock = (block) => ({
  type: SET_BLOCK,
  block
});

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

export const createBlock = ({
    creator_id,
    time_block_id,
    date,
    task,
    goal_id,
    note,
    type,
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
      type,
    }).then((response) => {
      if (response.success) {
        onSuccess(response);
        const newBlock = response.data;

        if (newBlock.time_block_id) {
          dispatch(insertBlocksByDate({
            block: newBlock,
            date
          }));
        } else {
          dispatch(insertActionBlock(newBlock));
        }
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

      dispatch(setBlock(response.data));
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