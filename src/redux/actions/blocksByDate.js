import {getBlocksByDateRange as getBlocksByDateRangeApi} from '../../api';
import {format} from 'date-fns';

export const SET_BLOCKS_BY_DATE = 'SET_BLOCKS_BY_DATE';
export const UPDATE_BLOCKS_BY_DATE = 'UPDATE_BLOCKS_BY_DATE';
export const INSERT_BLOCKS_BY_DATE = 'INSERT_BLOCKS_BY_DATE';
export const REMOVE_BLOCKS_BY_DATE = 'REMOVE_BLOCKS_BY_DATE';

export const setBlocksByDate = (blocks) => ({
  type: SET_BLOCKS_BY_DATE,
  blocks
});

export const insertBlocksByDate = ({block, date}) => ({
  type: INSERT_BLOCKS_BY_DATE,
  block,
  date
});


export const updateBlocksByDate = ({block, date}) => ({
  type: UPDATE_BLOCKS_BY_DATE,
  block,
  date
});

export const removeBlocksByDate = ({block, date}) => ({
  type: REMOVE_BLOCKS_BY_DATE,
  block,
  date
});

export const getBlocksByDate = ({
  start,
  end,
  search,
  type,
  goalId,
  userId,
  onSuccess,
  onError,
}) => {
  return async (dispatch, getState) => {
    start = format(start, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    end = format(end, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    return await getBlocksByDateRangeApi({
      startDate: start,
      endDate: end,
      userId,
      search,
      type,
      goalId,
    }).then((response) => {
      if (response.success) {
        dispatch(setBlocksByDate(response.data));
        onSuccess(response.data);
      } else {
        onError(response.error);
      }
    });
  };
}
