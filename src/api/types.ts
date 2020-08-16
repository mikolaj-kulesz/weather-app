export enum DataKeys {
  DAY = 'day',
  MORNING = 'morn',
  NIGHT = 'night',
  HUMIDITY = 'humidity',
}

export type SingleDayData = {
  [key in DataKeys]: number;
};

export interface WeatherApiResponse {
  daily: WeatherDailyPartApiResponse[];
  current: Current;
}

export interface WeatherDailyPartApiResponse {
  temp: SingleDayData;
  humidity: number;
}

export interface LocationCoordinates {
  locationName: string;
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  description: string;
  icon: string;
}

export interface Current {
  temp: number;
  humidity: number;
  weather: CurrentWeather[];
}

export interface WeatherInfo {
  fileredData: SingleDayData[];
  current: Current;
}

export interface Properties {
  formatted: string;
  lat: number;
  lon: number;
}

export interface Feature {
  properties: Properties;
}

export enum ErrorTypes {
  NO_LOCATION = 'NO_LOCATION',
}
