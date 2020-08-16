import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { CoordinatesSnapshot } from '../models/weather';

const useStyles = makeStyles((theme) => ({
  coordinatesWrapper: {
    display: 'flex',
    color: theme.palette.grey[500],
    margin: 0,
  },
  coordinatesLabel: {
    color: theme.palette.grey[500],
    margin: 0,
  },
  firstCoordinate: {
    marginRight: 20,
  },
  h2: {
    margin: 0,
    marginBottom: 10,
  },
}));

interface Props {
  coordinates: CoordinatesSnapshot;
}

const WeatherMainInfo: React.FC<Props> = ({
  coordinates: { locationName, lat, lon },
}) => {
  const classes = useStyles();
  return (
    <>
      <h2 className={classes.h2}>{locationName}</h2>
      <p className={classes.coordinatesLabel}>Coordinates:</p>
      <div className={classes.coordinatesWrapper}>
        <span className={classes.firstCoordinate}>lat: {lat}</span>
        <span>lon: {lon}</span>
      </div>
    </>
  );
};

export default WeatherMainInfo;
