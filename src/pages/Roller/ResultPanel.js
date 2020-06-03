import React from 'react';
import { Typography } from '@material-ui/core';
import { attackDice } from 'constants/dice';

function ResultPanel({
  isRolling,
  redAttackResults,
  blackAttackResults,
  whiteAttackResults
}) {
  let totalHits = 0;
  let totalCrits = 0;
  let totalSurges = 0;
  redAttackResults.forEach(result => {
    const { label } = attackDice.red.faces[result % 8];
    if (label === 'hit') totalHits += 1;
    if (label === 'crit') totalCrits += 1;
    if (label === 'surge') totalSurges += 1;
  });
  blackAttackResults.forEach(result => {
    const { label } = attackDice.black.faces[result % 8];
    if (label === 'hit') totalHits += 1;
    if (label === 'crit') totalCrits += 1;
    if (label === 'surge') totalSurges += 1;
  });
  whiteAttackResults.forEach(result => {
    const { label } = attackDice.white.faces[result % 8];
    if (label === 'hit') totalHits += 1;
    if (label === 'crit') totalCrits += 1;
    if (label === 'surge') totalSurges += 1;
  });
  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
      <Typography variant="body1" style={{ marginRight: 4 }}>
        Hits: {isRolling ? '?' : totalHits} /
      </Typography>
      <Typography variant="body1" style={{ marginRight: 4 }}>
        Crits: {isRolling ? '?' : totalCrits} /
      </Typography>
      <Typography variant="body1" style={{ marginRight: 4 }}>
        Surges: {isRolling ? '?' : totalSurges}
      </Typography>
    </div>
  );
};

export default ResultPanel;
