import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

interface Props {
  value: number;
  index: number;
}

const WeatherTabPanel: React.FC<Props> = (props) => {
  const { children, value, index } = props;
  const isEnabled = value === index;

  return (
    <div
      role="tabpanel"
      hidden={!isEnabled}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      {isEnabled && (
        <Box p={2}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default WeatherTabPanel;
