import { combineReducers } from 'redux';
import modal from './modal';
import block from './block';
import date from './date';
import blocksByDate from './blocksByDate';
import timeBlocks from './timeBlocks';
import goals from './goals';

export default combineReducers({
  modal: modal,
  block: block,
  blocksByDate: blocksByDate,
  date: date,
  timeBlocks: timeBlocks,
  goals: goals,
});