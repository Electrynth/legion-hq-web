import React from 'react';
import { Typography, IconButton } from '@material-ui/core';
import { Add as AddIcon, Remove as MinusIcon } from '@material-ui/icons';

function StackController({
  stackSize, handleIncrementStackSize, handleDecrementStackSize
}) {
  const rowContainerStyle = {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center'
  };
  const rowItemStyle = { marginRight: 4 };
  return (
    <div style={rowContainerStyle}>
      <Typography style={rowItemStyle}>
        Quantity:
      </Typography>
      <IconButton
        disabled={stackSize === 1}
        style={rowItemStyle}
        onClick={handleDecrementStackSize}
      >
        <MinusIcon />
      </IconButton>
      <Typography variant="h6" style={rowItemStyle}>
        {stackSize}
      </Typography>
      <IconButton
        disabled={stackSize === 12}
        style={rowItemStyle}
        onClick={handleIncrementStackSize}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default StackController;
