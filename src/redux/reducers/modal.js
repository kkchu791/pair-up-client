import {
    TOGGLE_MODAL,
  } from '../actions';

  const initialState = {
      isOpen: false,
  }
  
  const modalReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOGGLE_MODAL:
        return { ...state, ...action.payload };;
      default:
        return state;
    }
  };
  
  export default modalReducer;