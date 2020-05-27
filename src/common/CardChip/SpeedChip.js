import React from 'react';
import { Chip, Typography } from '@material-ui/core';
import { DirectionsRun as SpeedIcon } from '@material-ui/icons';

function SpeedChip({ size, speed }) {
  const label = speed < 4 && speed > -1 ? speed : 'Error';
  return (
    <Chip
      size={size}
      label={<Typography>{label}</Typography>}
      icon={<SpeedIcon style={{ color: '#e4427f' }} />}
      style={{ marginRight: 4, marginBottom: 4 }}
    />
  );
};

export default SpeedChip;
