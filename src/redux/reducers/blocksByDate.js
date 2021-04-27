import {
    SET_BLOCKS_BY_DATE,
    UPDATE_BLOCKS_BY_DATE,
    INSERT_BLOCKS_BY_DATE,
    REMOVE_BLOCKS_BY_DATE,
  } from '../actions';
  
const initialState = {};

const blocksByDateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BLOCKS_BY_DATE:
      return action.blocks;
    case INSERT_BLOCKS_BY_DATE:    
      state[action.date] = [...state[action.date], action.block];
      return state;
    case UPDATE_BLOCKS_BY_DATE:      
      const updatedBlocks = state[action.date].map(bl => {
        if (bl.id === action.block.id) {
          return Object.assign(bl, action.block);
        } else {
          return bl;
        }
      });
      state[action.date] = updatedBlocks;
      return state;
    case REMOVE_BLOCKS_BY_DATE:
      console.log(action.date, 'action.date');
      state[action.date] = state[action.date].filter(bl => bl.id !== action.block.id) || [];
      return state;
    default:
      return state;
  }
};

export default blocksByDateReducer;