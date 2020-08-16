import {
  types,
  flow,
  SnapshotIn,
  applySnapshot,
  getSnapshot,
  Instance,
} from 'mobx-state-tree';
import { getWeatherInfo, TrackerClass } from '../services/weather';
import {
  DataKeys,
  SingleDayData,
  Current,
  LocationCoordinates,
  ErrorTypes,
} from '../services/types';
import { getCoordinates } from '../services/geolocation';
import { defaultCoordinates } from './weather.fixtures';
import { LoadingStates, LoadingState } from './types';

const SingleWeatherStatsTracker = types.model({
  min: types.maybe(types.number),
  max: types.maybe(types.number),
  mean: types.maybe(types.number),
  mode: types.maybeNull(types.number),
});

const Coordinates = types.model({
  locationName: types.maybe(types.string),
  lat: types.maybe(types.number),
  lon: types.maybe(types.number),
});

const CurrentWeather = types.model({
  temp: types.maybe(types.number),
  humidity: types.maybe(types.number),
  description: types.maybe(types.string),
  icon: types.maybe(types.string),
});

export const WeatherConditions = types
  .model({
    [DataKeys.HUMIDITY]: types.optional(SingleWeatherStatsTracker, {}),
    [DataKeys.DAY]: types.optional(SingleWeatherStatsTracker, {}),
    [DataKeys.MORNING]: types.optional(SingleWeatherStatsTracker, {}),
    [DataKeys.NIGHT]: types.optional(SingleWeatherStatsTracker, {}),
    coordinates: types.optional(Coordinates, {}),
    currentWeather: types.optional(CurrentWeather, {}),
    loadingState: types.optional(
      types.enumeration(LoadingStates),
      LoadingState.INITIAL
    ),
    errorMessage: types.maybeNull(types.string),
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .actions((self: any) => ({
    afterCreate(): void {
      self.getUserCoordinates();
    },
    loadTrackers: flow(function* loadTrackersHandler(
      coordinates?: LocationCoordinates
    ) {
      try {
        const { fileredData, current } = yield getWeatherInfo(coordinates);
        self.setTrackers(fileredData);
        self.setCurrentWeather(current);
        self.setLoadingState(LoadingState.SUCCESS);
      } catch (e) {
        self.setLoadingState(LoadingState.ERROR);
      }
    }),
    getCoordinates: flow(function* getCoordinatesHandler(location: string) {
      self.setLoadingState(LoadingState.LOADING);
      self.setErrorMessage(null);
      try {
        const coordinates: Coordinates = yield getCoordinates(location);
        self.setCoordinates(coordinates);
        self.loadTrackers(coordinates);
      } catch (e) {
        if (e.message === ErrorTypes.NO_LOCATION) {
          self.setErrorMessage('No such location. Try again.');
        }
        self.setLoadingState(LoadingState.ERROR);
      }
    }),
    getUserCoordinates(): void {
      if (!window.navigator.geolocation) return;
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          const location = {
            lat,
            lon,
            locationName: 'Your location :)',
          };
          self.setCoordinates(location);
          self.loadTrackers(location);
        },
        () => {
          self.setCoordinates(defaultCoordinates);
          self.loadTrackers(defaultCoordinates);
        }
      );
    },
    setCoordinates(coordinates: Coordinates): void {
      const currentSnapshot: WeatherConditionsSnapshot = getSnapshot(self);
      const newSnapshot = {
        ...currentSnapshot,
        coordinates,
      };
      applySnapshot(self, newSnapshot);
    },
    setTrackers(fileredData: SingleDayData[]): void {
      Object.values(DataKeys).forEach((key) => {
        const currentSnapshot: WeatherConditionsSnapshot = getSnapshot(self);
        const newSnapshot = {
          ...currentSnapshot,
          [key]: new TrackerClass(fileredData, key).all,
        };
        applySnapshot(self, newSnapshot);
      });
    },
    setCurrentWeather(current: Current): void {
      const { temp, humidity } = current;
      const currentSnapshot: WeatherConditionsSnapshot = getSnapshot(self);
      const currentWeather = {
        temp,
        humidity,
        description: current.weather[0]?.description,
        icon: current.weather[0]?.icon,
      };
      const newSnapshot = {
        ...currentSnapshot,
        currentWeather,
      };
      applySnapshot(self, newSnapshot);
    },
    setLoadingState(loadingState: LoadingState): void {
      const currentSnapshot: WeatherConditionsSnapshot = getSnapshot(self);
      const newSnapshot = {
        ...currentSnapshot,
        loadingState,
      };
      applySnapshot(self, newSnapshot);
    },
    setErrorMessage(errorMessage: string | null): void {
      const currentSnapshot: WeatherConditionsSnapshot = getSnapshot(self);
      const newSnapshot = {
        ...currentSnapshot,
        errorMessage,
      };
      applySnapshot(self, newSnapshot);
    },
  }));

export const singleWeatherStatsTracker = SingleWeatherStatsTracker.create();
export const weatherConditions = WeatherConditions.create();

export type WeatherConditionsSnapshot = SnapshotIn<typeof WeatherConditions>;
export type WeatherConditionsInstance = Instance<typeof WeatherConditions>;

export type SingleWeatherStatsTrackerSnapshot = SnapshotIn<
  typeof SingleWeatherStatsTracker
>;
export type CoordinatesSnapshot = SnapshotIn<typeof Coordinates>;
export type CurrentWeatherSnapshot = SnapshotIn<typeof CurrentWeather>;
