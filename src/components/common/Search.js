import React from 'react';
import styles from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from 'material-ui-search-bar';
import {
  getBlocksByDate,
  setFilter
} from '../../redux/actions';
import { FILTER_DATES } from '../../constants';
import { useAuthState } from '../../context';

export const Search = () => {
  const dispatch = useDispatch();
  const { range, search, goalId } = useSelector(state => state.filter);
  const {currentDateObj} = useSelector(state => state.date);
  const [start, end] = FILTER_DATES[range](currentDateObj);
  const { userDetails } = useAuthState();

  const handleRequestSearch = () => {
    dispatch(getBlocksByDate({
      start, 
      end,
      search,
      goalId,
      userId: userDetails.id,
      onSuccess: () => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }

  const handleSearchChange = (val) => {
    dispatch(setFilter({search: val}));
  }

  return (
    <div className={styles.container}>
       <SearchBar
          onRequestSearch={handleRequestSearch}
          onChange={handleSearchChange}
          placeholder='search'
          autoFocus
          className={styles.search}
        />
    </div>
  )
}

export default Search;