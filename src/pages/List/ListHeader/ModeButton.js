import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import LargerTooltip from 'common/LargerTooltip';

function ModeButton({ points, maxPoints, tooltip, handleClick }) {
  return (
    <LargerTooltip title={tooltip}>
      <Chip
        clickable
        variant={points > maxPoints ? 'default' : 'outlined'}
        label={`${points}/${maxPoints}`}
        onClick={handleClick}
        style={points > maxPoints ? { backgroundColor: '#f44336' } : {}}
      />
    </LargerTooltip>
  );
};

ModeButton.defaultProps = {
  tooltip: 'Toggle between Skirmish (500), Standard (800), and Grand Army (1600) formats.'
};

ModeButton.propTypes = {
  tooltip: PropTypes.string,
  points: PropTypes.number.isRequired,
  maxPoints: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default ModeButton;
