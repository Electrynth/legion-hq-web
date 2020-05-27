import React from 'react';
import SpeedChip from './SpeedChip';
import SurgeChips from './SurgeChips';
import DefenseChip from './DefenseChip';
import PointsChip from './PointsChip';
import StatChip from './StatChip';

function CardChip({ size = 'small', type, value }) {
  if (type === 'speed') {
    return <SpeedChip size={size} speed={value} />;
  } else if (type === 'surge' || type === 'surges') {
    return <SurgeChips size={size} surges={value} />;
  } else if (type === 'defense') {
    return <DefenseChip size={size} color={value} />;
  } else if (type === 'points') {
    return <PointsChip size={size} points={value} />;
  } else {
    return <StatChip size={size} type={type} value={value} />;
  }
};

export default CardChip;
