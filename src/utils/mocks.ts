import { LoadingState } from '../models/types';

export const weatherModelFixture = {
  humidity: {
    min: 46,
    max: 83,
    mean: 58.63,
    mode: null,
  },
  day: {
    min: 20.66,
    max: 27.79,
    mean: 24.66,
    mode: null,
  },
  morn: {
    min: 18.41,
    max: 22.26,
    mean: 19.91,
    mode: null,
  },
  night: {
    min: 18.29,
    max: 25.98,
    mean: 22.02,
    mode: null,
  },
  coordinates: {
    locationName: 'Vienna, Wien, Austria',
    lat: 48.198674,
    lon: 16.348388,
  },
  currentWeather: {
    temp: 20.66,
    humidity: 83,
    description: 'clear sky',
    icon: '01n',
  },
  loadingState: LoadingState.SUCCESS,
  errorMessage: null,
};

export default weatherModelFixture;
