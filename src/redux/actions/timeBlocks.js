import { getTimeBlocks as getTimeBlocksApi } from '../../api';

export const SET_TIME_BLOCKS = "SET_TIME_BLOCKS";

export const setTimeBlocks = (payload) => ({
  type: SET_TIME_BLOCKS,
  payload
});

export const getTimeBlocks = ({
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    return await getTimeBlocksApi().then((response) => {
      if (response.success) {
        dispatch(setTimeBlocks(response.data));
        onSuccess();
      } else {
        onError(response.error);
      }
    });
  };
}
