import { format } from 'date-fns';

export const convertTimeTo24 = (timeString) => {
  let H = +timeString.substr(0, 2);
  let h = H % 12 || 12;
  let ampm = (H < 12 || H === 24) ? "am" : "pm";
  return h + timeString.substr(2, 3) + ampm;
};

export const convertTimeTo24Grid = (timeString) => {
  let H = +timeString.substr(0, 2);
  let h = H % 12 || 12;
  let ampm = (H < 12 || H === 24) ? ":A" : ":P";
  return h + timeString.substr(2, 3) + ampm;
};

export const roundMinutes = (date) => {
  date.setHours(date.getHours() + Math.floor(date.getMinutes()/60));
  date.setMinutes(0, 0, 0);
  const time = date.toTimeString().split(' ')[0];
  return time;
};

export const isStartOfHour = (time) => {
  return time.split(":")[1] === '00';
};

export const getCurrentMilitaryTime = () => {
  return format(new Date(), 'kk:mm:ss');
}
