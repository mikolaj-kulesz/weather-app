import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react';
import {
  weatherConditions,
  WeatherConditionsInstance,
} from '../models/weather';

interface WeatherContext {
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  weatherConditions: WeatherConditionsInstance;
}

export const WeatherContext = React.createContext<WeatherContext>({
  tabIndex: 0,
  setTabIndex: () => 0,
  weatherConditions,
});

const WeatherContextProvider: React.FC = ({ children }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const value = {
    tabIndex,
    setTabIndex,
    weatherConditions,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeatherContext = (): WeatherContext => {
  const weatherContext = useContext(WeatherContext);

  if (weatherContext === null) {
    throw new Error(
      'weatherContext must be used within the ThemeEditorContextProvider!'
    );
  }

  return {
    ...weatherContext,
  };
};

export default observer(WeatherContextProvider);
