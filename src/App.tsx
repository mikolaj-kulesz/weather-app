import React from 'react';
import { makeStyles } from '@material-ui/core';
import Weather from './Weather';
import WeatherContextProvider from './contexts/WeatherContext';
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',

    '@media (min-width: 768px)': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <WeatherContextProvider>
        <Weather />
      </WeatherContextProvider>
    </div>
  );
};

export default App;
