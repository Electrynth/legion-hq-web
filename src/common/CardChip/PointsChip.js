import React from 'react';
import { Chip, Typography } from '@material-ui/core';

function PointsChip({ size, points }) {
  const label = `${points} ${points === 1 ? 'point' : 'points'}`;
  return (
    <Chip
      size={size}
      label={<Typography variant="body2">{label}</Typography>}
      style={{ marginBottom: 4, marginRight: 4 }}
    />
  );
}

export default PointsChip;
