import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableBody,
} from '@material-ui/core';
import { CurrentWeatherSnapshot } from '../models/weather';

const useStyles = makeStyles(() => ({
  iconBlock: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: 50,
  },
  desc: {
    textTransform: 'capitalize',
  },
}));

interface Props {
  current: CurrentWeatherSnapshot;
}

const WeatherCurrentInfo: React.FC<Props> = ({
  current: { humidity, temp, description, icon },
}) => {
  const classes = useStyles();
  return (
    <>
      <h3>Current Weather:</h3>
      <div className={classes.iconBlock}>
        <img
          className={classes.icon}
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
        />
        <span className={classes.desc}>{description}</span>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="weather current info">
          <TableBody>
            <TableRow>
              <TableCell>Temp </TableCell>
              <TableCell>
                {temp} {'\u2103'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Humidity </TableCell>
              <TableCell>{humidity} %</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WeatherCurrentInfo;
