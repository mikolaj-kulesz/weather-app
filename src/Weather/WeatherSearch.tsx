import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Divider } from '@material-ui/core';
import { useWeatherContext } from '../contexts/WeatherContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    marginBottom: 10,
  },
}));

const WeatherSearch: React.FC = () => {
  const classes = useStyles();
  const { weatherConditions, setTabIndex } = useWeatherContext();
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setSearchValue(event.target.value);
  };

  const submitHandler = (event: React.FormEvent<HTMLDivElement>): void => {
    event.preventDefault();
    if (!searchValue) return;
    weatherConditions.getCoordinates(searchValue);
    setTabIndex(0);
  };

  return (
    <>
      <Paper component="form" onSubmit={submitHandler} className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search for location"
          inputProps={{ 'aria-label': 'search for location' }}
          onChange={handleChange}
          data-testid="search-input"
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Divider className={classes.divider} />
    </>
  );
};

export default WeatherSearch;
