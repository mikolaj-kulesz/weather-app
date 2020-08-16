import React from 'react';
import { Typography } from '@material-ui/core';
import { useWeatherContext } from '../contexts/WeatherContext';

const WeatherErrorInfo: React.FC = () => {
  const {
    weatherConditions: { errorMessage },
  } = useWeatherContext();

  const headline = errorMessage ? 'Sorry :(' : 'Error :(';
  const message =
    errorMessage ||
    'Sorry, but we have a problem with our weather api :( Please refreash the page or try again later.';

  return (
    <Typography component="div">
      <h2>{headline}</h2>
      <p>{message}</p>
    </Typography>
  );
};

export default WeatherErrorInfo;
