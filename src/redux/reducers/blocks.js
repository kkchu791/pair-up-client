import {
  SET_BLOCK,
  SET_ACTION_BLOCKS,
  INSERT_ACTION_BLOCK,
  UPDATE_ACTION_BLOCK,
  REMOVE_ACTION_BLOCK,
} from '../actions';

  const initialState = {
    actionBlocks: [],
    currentBlock: {note: []},
  };
  const blocksReducer = (state = initialState, action) => {
    let list;
    switch (action.type) {
      case SET_BLOCK:
        return {...state, ...{currentBlock: action.block}};
      case SET_ACTION_BLOCKS:
        return {...state, ...{actionBlocks: action.blocks || []}};
      case INSERT_ACTION_BLOCK:
        list = [...state.actionBlocks, action.block];
        return {...state, ...{actionBlocks: list}};
      case UPDATE_ACTION_BLOCK:
        list = state.actionBlocks.map(bl => {
          if (bl.id === action.block.id) {
            return Object.assign(bl, action.block);
          } else {
            return bl;
          }
        });
        return {...state, ...{actionBlocks: list}};
      case REMOVE_ACTION_BLOCK:
        list = state.actionBlocks.filter(bl => bl.id !== action.block.id);
        return {...state, ...{actionBlocks: list}};
      default:
        return state;
    }
  };
  
  export default blocksReducer;