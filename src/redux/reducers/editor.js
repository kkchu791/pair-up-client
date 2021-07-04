import { SET_EDITOR } from '../actions';
import { EDITOR_TYPES } from '../../constants';

const initialState = { 
  type: EDITOR_TYPES.SLATE
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDITOR:
      return { ...state, ...action.payload};
    default:
      return state;
  }
};

export default editorReducer;