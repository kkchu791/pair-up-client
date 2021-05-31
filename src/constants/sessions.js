import {
  startOfToday,
  endOfToday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
}  from 'date-fns';

export const FILTERS = {
  day: 'D',
  week: 'W',
  month: 'M',
  all: 'All',
}

export const FILTER_DATES = {
  day: [startOfToday(), endOfToday()],
  week: [startOfWeek(new Date(), { weekStartsOn: 1 }), endOfWeek(new Date(), { weekStartsOn: 1 })],
  month: [startOfMonth(new Date()), endOfMonth(new Date())],
  all: [startOfYear(new Date()), endOfYear(new Date())],
}
