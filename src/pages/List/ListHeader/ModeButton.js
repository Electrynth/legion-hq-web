import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Chip, Menu, MenuItem } from '@material-ui/core';
import LargerTooltip from 'common/LargerTooltip';

function ModeButton({ currentMode, points, maxPoints, tooltip, handleChangeMode }) {
  const [anchorEl, setAnchorEl] = useState();
  const handleOpenMenu = event => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl();
  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          selected={currentMode === '500-point mode'}
          onClick={() => {
            handleChangeMode('500-point mode');
            handleCloseMenu();
          }}
        >
          Skirmish (500 pts)
        </MenuItem>
        <MenuItem
          selected={currentMode === 'standard mode'}
          onClick={() => {
            handleChangeMode('standard mode');
            handleCloseMenu();
          }}
        >
          Standard (800 pts)
        </MenuItem>
        <MenuItem
          selected={currentMode === 'grand army mode'}
          onClick={() => {
            handleChangeMode('grand army mode');
            handleCloseMenu();
          }}
        >
          Grand Army (1600 pts)
        </MenuItem>
        <MenuItem
          selected={currentMode === 'storm tide: infantry'}
          onClick={() => {
            handleChangeMode('storm tide: infantry');
            handleCloseMenu();
          }}
        >
          Storm Tide: Infantry Division
        </MenuItem>
        <MenuItem
          selected={currentMode === 'storm tide: armored'}
          onClick={() => {
            handleChangeMode('storm tide: armored');
            handleCloseMenu();
          }}
        >
          Storm Tide: Armored Division
        </MenuItem>
        <MenuItem
          selected={currentMode === 'storm tide: special forces'}
          onClick={() => {
            handleChangeMode('storm tide: special forces');
            handleCloseMenu();
          }}
        >
          Storm Tide: Special Forces Division
        </MenuItem>
      </Menu>
      <Chip
        clickable
        variant={points > maxPoints ? 'default' : 'outlined'}
        label={`${points}/${maxPoints}`}
        onClick={handleOpenMenu}
        style={points > maxPoints ? { backgroundColor: '#f44336' } : {}}
      />
    </React.Fragment>
  );
};

ModeButton.defaultProps = {
  tooltip: 'Toggle between Skirmish (500), Standard (800), and Grand Army (1600) formats.'
};

ModeButton.propTypes = {
  tooltip: PropTypes.string,
  points: PropTypes.number.isRequired,
  maxPoints: PropTypes.number.isRequired,
  handleChangeMode: PropTypes.func.isRequired
};

export default ModeButton;
