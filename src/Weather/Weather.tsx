import React, { ChangeEvent } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { observer } from 'mobx-react';
import { CircularProgress } from '@material-ui/core';
import { SingleWeatherStatsTrackerSnapshot } from '../models/weather';
import WeatherSearch from './WeatherSearch';
import { LoadingState } from '../models/types';
import WeatherInitialInfo from './WeatherInitialInfo';
import WeatherErrorInfo from './WeatherErrorInfo';
import WeatherTabPanels from './WeatherTabPanels';
import { useWeatherContext } from '../contexts/WeatherContext';

const getProps = (
  index: number
): {
  id: string;
  'aria-controls': string;
} => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  weatherWrapper: {
    maxWidth: 600,
    minHeight: 400,
    backgroundColor: theme.palette.background.paper,
    padding: 20,
    boxShadow: '5px 5px 5px 0 rgba(0,0,0,0.1)',
  },
  loaderWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    boxSizing: 'border-box',
  },
}));

const Weather: React.FC = () => {
  const classes = useStyles();
  const { tabIndex, setTabIndex, weatherConditions } = useWeatherContext();

  const handleChange = (_: ChangeEvent<{}>, newValue: number): void => {
    setTabIndex(newValue);
  };

  interface TabelData extends SingleWeatherStatsTrackerSnapshot {
    label: string;
  }

  const renderSwitch = (loadingState: LoadingState): JSX.Element => {
    switch (loadingState) {
      case LoadingState.LOADING:
        return (
          <div className={classes.loaderWrapper}>
            <CircularProgress />
          </div>
        );
      case LoadingState.SUCCESS:
        return <WeatherTabPanels />;
      case LoadingState.ERROR:
        return <WeatherErrorInfo />;
      default:
        return <WeatherInitialInfo />;
    }
  };

  return (
    <div className={classes.weatherWrapper}>
      <WeatherSearch />
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Weather" {...getProps(0)} />
        <Tab label="Temperature Stats" {...getProps(1)} />
        <Tab label="Humidity Stats" {...getProps(2)} />
      </Tabs>
      {renderSwitch(weatherConditions.loadingState)}
    </div>
  );
};

export default observer(Weather);
