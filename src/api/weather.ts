import { mode } from 'mathjs';
import {
  SingleDayData,
  DataKeys,
  WeatherApiResponse,
  WeatherDailyPartApiResponse,
  LocationCoordinates,
  WeatherInfo,
} from './types';

export class TrackerClass {
  private data: SingleDayData[];

  private key: DataKeys;

  constructor(data: SingleDayData[], key: DataKeys) {
    this.data = data;
    this.key = key;
  }

  private get dataSet(): number[] {
    return this.data.map((day) => day[this.key]);
  }

  get min(): number {
    return Math.min(...this.dataSet);
  }

  get max(): number {
    return Math.max(...this.dataSet);
  }

  get mean(): number {
    const mean =
      this.dataSet.reduce((a: number, b: number) => a + b) /
      this.dataSet.length;
    return +mean.toFixed(2);
  }

  get mode(): number | null {
    const modeValue = mode(this.dataSet);
    return modeValue.lenght === 1 ? modeValue[0] : null;
  }

  get all(): {
    min: number;
    max: number;
    mean: number;
    mode: number | null;
  } {
    return {
      min: this.min,
      max: this.max,
      mean: this.mean,
      mode: this.mode,
    };
  }
}

const getQueryParameters = (coordinates?: LocationCoordinates): string => {
  const params = {
    lat: coordinates?.lat || 51.057046,
    lon: coordinates?.lon || 16.902465,
    exclude: 'minutely,hourly',
    cnt: 5,
    units: 'metric',
    appid: process.env.REACT_APP_OPEN_WEATHER_MAP_KEY,
  };
  return (Object.keys(params) as Array<keyof typeof params>)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
};

const getUrl = (coordinates?: LocationCoordinates): string => {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall';
  return `${baseUrl}?${getQueryParameters(coordinates)}`;
};

export const getWeatherInfo = async (
  coordinates?: LocationCoordinates
): Promise<WeatherInfo> => {
  const url = getUrl(coordinates);
  const response = await fetch(url);
  const data: WeatherApiResponse = await response.json();
  const fileredData: SingleDayData[] = data.daily.map(
    (day: WeatherDailyPartApiResponse) => ({
      ...day.temp,
      humidity: day.humidity,
    })
  );
  return {
    fileredData,
    current: data.current,
  };
};
