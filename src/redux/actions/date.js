export const SET_DATE = "SET_DATE";

export const setDate = ({dateObj, dateStr}) => ({
  type: SET_DATE,
  dateObj: dateObj,
  dateStr: dateStr,
});