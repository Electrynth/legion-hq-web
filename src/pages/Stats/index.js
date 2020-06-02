import React from 'react';
import { Typography } from '@material-ui/core';
import AttackDie from './AttackDie';

function Stats() {
  return (
    <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
      <Typography variant="h5">
        <AttackDie color="red" />
        <AttackDie color="red" />
      </Typography>
    </div>
  );
};

export default Stats;
