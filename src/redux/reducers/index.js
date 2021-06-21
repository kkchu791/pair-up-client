import { combineReducers } from 'redux';
import modal from './modal';
import date from './date';
import blocksByDate from './blocksByDate';
import timeBlocks from './timeBlocks';
import goals from './goals';
import blocks from './blocks';
import drawer from './drawer';
import audio from './audio';
import timer from './timer';

export default combineReducers({
  modal: modal,
  blocksByDate: blocksByDate,
  date: date,
  timeBlocks: timeBlocks,
  goals: goals,
  blocks: blocks,
  drawer: drawer,
  audio: audio,
  timer: timer,
});