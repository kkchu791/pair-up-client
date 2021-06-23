import {
  createBlock as createBlockApi,
  removeBlock as removeBlockApi,
  updateBlock as updateBlockApi,
  getActionBlocks as getActionBlocksApi,
  getCurrentBlock as getCurrentBlockApi,
  getUpcomingBlock as getUpcomingBlockApi,
} from '../../api'
import {
  removeBlocksByDate,
  insertBlocksByDate,
  updateBlocksByDate,
} from './blocksByDate';
import { BLOCK_TYPE } from '../../constants'

export const SET_BLOCK = 'SET_BLOCK';
export const SET_ACTIVE_BLOCK = 'SET_ACTIVE_BLOCK';
export const SET_ACTION_BLOCKS = 'SET_ACTION_BLOCKS';
export const INSERT_ACTION_BLOCK = 'INSERT_ACTION_BLOCK';
export const UPDATE_ACTION_BLOCK = 'UPDATE_ACTION_BLOCK';
export const REMOVE_ACTION_BLOCK = 'REMOVE_ACTION_BLOCK';

export const setBlock = (block) => ({
  type: SET_BLOCK,
  block
});

export const setActiveBlock = (block) => ({
  type: SET_ACTIVE_BLOCK,
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

export const getActiveBlock = ({
  userId,
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    return await getCurrentBlockApi({
      userId
    }).then((response) => {
      if (response.success) {
        if (response.data.length === 0) {
          dispatch(getUpcomingBlock({userId}));
        } else {
          dispatch(setActiveBlock(response.data));
          dispatch(setBlock(response.data));
        }
        onSuccess();
      } else {
        onError(response.error);
      }
    });
  };
}

export const getUpcomingBlock = ({
  userId,
  onSuccess = () => console.log('get upcoming success'),
  onError = () => console.log('get upcoming failure'),
}) => {
  return async (dispatch, getState) => {
    return await getUpcomingBlockApi({
      userId
    }).then((response) => {
      if (response.success) {
        dispatch(setActiveBlock(response.data));
        dispatch(setBlock(response.data));
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
    text,
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
      text,
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

        dispatch(setBlock(response.data));
        dispatch(setActiveBlock(response.data));
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
  text,
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
    text,
    goal_id,
    note,
    images,
  }).then((response) => {
    if (response.success) {
      onSuccess(response);
      const updatedBlock = response.data;
      if (updatedBlock.time_block_id) {
        if (updatedBlock.type === BLOCK_TYPE.IMPROVEMENT) {
          dispatch(insertBlocksByDate({
            block: updatedBlock,
            date
          }));  
        } else {
          dispatch(updateBlocksByDate({
            block: updatedBlock,
            date
          }));  
        }

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
      getState().timer.status === 'end'  ? dispatch(setActiveBlock({})) : dispatch(setActiveBlock(response.data));
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