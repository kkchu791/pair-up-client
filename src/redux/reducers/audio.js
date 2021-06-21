import { PLAY_AUDIO } from '../actions';

const initialState = {isPlaying: false};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_AUDIO:
      return {...state, ...{isPlaying: action.isPlaying}};
    default:
      return state;
  }
};

export default audioReducer;