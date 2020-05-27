import React from 'react';
import Img from 'react-image';
import { Chip, Typography } from '@material-ui/core';
import symbols from 'constants/symbols';

function StatChip({ size, type, value }) {
  let label = 'Error';
  if (value > 0) label = value;
  else if (value < 1) label = '-';
  const icon = (
    <Img
      alt={type}
      src={symbols[type]}
      style={size === 'small' ? null : { width: 22 }}
    />
  );
  return (
    <Chip
      size={size}
      icon={icon}
      label={<Typography>{label}</Typography>}
      style={{ marginRight: 4, marginBottom: 4 }}
    />
  );
};

export default StatChip;
