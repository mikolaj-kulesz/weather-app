import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { SingleWeatherStatsTrackerSnapshot } from '../models/weather';

interface TabelData extends SingleWeatherStatsTrackerSnapshot {
  label: string;
}

interface Props {
  data: TabelData[];
  headline: string;
  unit?: string;
}

const WeatherTable: React.FC<Props> = ({ data, headline, unit }) => {
  const firstRow = data[0];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{headline}</TableCell>
            {Object.keys(firstRow)
              .filter((key) => key !== 'label')
              .map((key) => (
                <TableCell align="right">{key}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow>
              <TableCell>{row.label}</TableCell>
              <TableCell align="right">
                {row.min} {unit}
              </TableCell>
              <TableCell align="right">
                {row.max} {unit}
              </TableCell>
              <TableCell align="right">
                {row.mean} {unit}
              </TableCell>
              <TableCell align="right">
                {row.mode ? row.mode : '-'} {row.mode && unit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherTable;
