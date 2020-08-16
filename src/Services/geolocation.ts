import { LocationCoordinates, Feature, ErrorTypes } from './types';

const getQueryParameters = (location: string): string => {
  const params = {
    text: encodeURIComponent(location),
    apiKey: process.env.REACT_APP_GEOAPIFY_KEY,
  };
  return (Object.keys(params) as Array<keyof typeof params>)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
};

const getUrl = (location: string): string => {
  const baseUrl = 'https://api.geoapify.com/v1/geocode/search';
  return `${baseUrl}?${getQueryParameters(location)}`;
};

export const getCoordinates = async (
  location: string
): Promise<LocationCoordinates> => {
  const url = getUrl(location);
  const response = await fetch(url);
  const data: { features: Feature[] } = await response.json();
  const { features } = data;
  if (!features.length) {
    throw Error(ErrorTypes.NO_LOCATION);
  }
  return {
    locationName: features[0].properties.formatted,
    lat: features[0].properties.lat,
    lon: features[0].properties.lon,
  };
};

export default getCoordinates;
