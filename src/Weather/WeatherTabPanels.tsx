import React from 'react';
import { getSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react';
import WeatherTabPanel from './WeatherTabPanel';
import { DataKeys } from '../services/types';
import { useWeatherContext } from '../contexts/WeatherContext';
import WeatherTable from './WeatherTable';
import { SingleWeatherStatsTrackerSnapshot } from '../models/weather';
import WeatherMainInfo from './WeatherMainInfo';
import WeatherCurrentInfo from './WeatherCurrentInfo';

interface TabelData extends SingleWeatherStatsTrackerSnapshot {
  label: string;
}

const WeatherTabPanels: React.FC = () => {
  const { tabIndex, weatherConditions } = useWeatherContext();

  const tempData: TabelData[] = [
    {
      ...getSnapshot(weatherConditions[DataKeys.DAY]),
      label: 'DAY',
    },
    {
      ...getSnapshot(weatherConditions[DataKeys.MORNING]),
      label: 'MORNING',
    },
    {
      ...getSnapshot(weatherConditions[DataKeys.NIGHT]),
      label: 'NIGHT',
    },
  ];

  const humidityData: TabelData[] = [
    {
      ...getSnapshot(weatherConditions[DataKeys.HUMIDITY]),
      label: 'HUMIDITY',
    },
  ];

  return (
    <div>
      <WeatherTabPanel value={tabIndex} index={0}>
        <WeatherMainInfo
          coordinates={getSnapshot(weatherConditions.coordinates)}
        />
        <WeatherCurrentInfo
          current={getSnapshot(weatherConditions.currentWeather)}
        />
      </WeatherTabPanel>
      <WeatherTabPanel value={tabIndex} index={1}>
        <WeatherTable data={tempData} headline="Temperature" unit={'\u2103'} />
      </WeatherTabPanel>
      <WeatherTabPanel value={tabIndex} index={2}>
        <WeatherTable data={humidityData} headline="Humidity" unit="%" />
      </WeatherTabPanel>
    </div>
  );
};

export default observer(WeatherTabPanels);
