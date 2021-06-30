import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
}  from 'date-fns';

export const FILTERS = {
  day: 'day',
  week: 'week',
  month: 'month',
  all: 'All',
}

export const FILTER_DATES = {
  day: (date) => [startOfDay(date), endOfDay(date)],
  week: (date) => [startOfWeek(date, { weekStartsOn: 1 }), endOfWeek(date, { weekStartsOn: 1 })],
  month: (date) => [startOfMonth(date), endOfMonth(date)],
  all: (date) => [startOfYear(date), endOfYear(date)],
}

export const DAYS = {
  day: 1,
  week: 7,
  month: 30,
  all: 0,
}
