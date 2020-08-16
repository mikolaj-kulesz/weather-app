/* eslint-disable */

import React from 'react';
import { render } from '@testing-library/react';
import { WeatherContext } from '../contexts/WeatherContext';
import Weather from './Weather';
import { WeatherConditions } from '../models/weather';
import { weatherModelFixture } from '../utils/mocks';

test('renders correct data after receiving correct responses from api - 1st tab', () => {
  const value = {
    tabIndex: 0,
    setTabIndex: () => 0,
    weatherConditions: WeatherConditions.create(weatherModelFixture),
  };
  const { getByText } = render(
    <WeatherContext.Provider value={value}>
      <Weather />
    </WeatherContext.Provider>
  );

  const location = getByText('Vienna, Wien, Austria');
  expect(location).toBeVisible();

  const weatherConditions = getByText('clear sky');
  expect(weatherConditions).toBeVisible();

  const lat = getByText('lat: 48.198674');
  expect(lat).toBeVisible();

  const temp = getByText('20.66 ℃');
  expect(temp).toBeVisible();

  const humidity = getByText('83 %');
  expect(humidity).toBeVisible();
});

test('renders correct data after receiving correct responses from api - 2nd tab', () => {
  const value = {
    tabIndex: 1,
    setTabIndex: () => 1,
    weatherConditions: WeatherConditions.create(weatherModelFixture),
  };
  const { getByText } = render(
    <WeatherContext.Provider value={value}>
      <Weather />
    </WeatherContext.Provider>
  );

  const tempDayMax = getByText('27.79 ℃');
  expect(tempDayMax).toBeVisible();

  const tempMorningMean = getByText('19.91 ℃');
  expect(tempMorningMean).toBeVisible();
});

test('renders correct data after receiving correct responses from api - 3rd tab', () => {
  const value = {
    tabIndex: 2,
    setTabIndex: () => 2,
    weatherConditions: WeatherConditions.create(weatherModelFixture),
  };
  const { getByText } = render(
    <WeatherContext.Provider value={value}>
      <Weather />
    </WeatherContext.Provider>
  );

  const humidityMin = getByText('46 %');
  expect(humidityMin).toBeVisible();

  const humidityMax = getByText('83 %');
  expect(humidityMax).toBeVisible();

  const humidityMean = getByText('58.63 %');
  expect(humidityMean).toBeVisible();
});
