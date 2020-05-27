import React from 'react';
import Chip from '@material-ui/core/Chip';

function SimpleButton({ isDisabled, icon, label, handleClick }) {
  return (
    <Chip
      clickable
      disabled={isDisabled}
      variant="outlined"
      icon={icon}
      label={label}
      onClick={handleClick}
      style={{ marginRight: 4, marginBottom: 4 }}
    />
  );
};

export default SimpleButton;
