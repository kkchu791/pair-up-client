import { TOGGLE_DRAWER } from '../actions';

const initialState = {isOpen: false};

const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {...state, ...{isOpen: action.isOpen}};
    default:
      return state;
  }
};

export default drawerReducer;