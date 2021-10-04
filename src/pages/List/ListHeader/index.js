import React, { useContext } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListContext from 'context/ListContext';
import legionModes from 'constants/legionModes';
import ModeButton from './ModeButton';
import TitleField from './TitleField';
import FactionButton from './FactionButton';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: { marginRight: 6 }
});

function ListHeader() {
  const {
    currentList,
    handleChangeTitle,
    handleChangeMode
  } = useContext(ListContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleFactionMenuOpen = event => setAnchorEl(event.currentTarget);
  const handleFactionMenuClose = () => setAnchorEl(null);
  const numActivations = currentList.units.reduce((num, unit) => {
    num += unit.count;
    return num;
  }, 0);

  return (
    <div id="list-header" className={classes.container}>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFactionMenuClose}
      >
        <MenuItem onClick={handleFactionMenuClose}>
          Select a battle force
        </MenuItem>
      </Menu>
      <div className={classes.item}>
        <FactionButton
          faction={currentList.faction}
          handleFactionMenuOpen={handleFactionMenuOpen}
          handleFactionMenuClose={handleFactionMenuClose}
        />
      </div>
      <div className={classes.item}>
        <TitleField
          activations={numActivations}
          title={currentList.title}
          handleChange={e => {
            e.persist();
            handleChangeTitle(e.target.value);
          }}
        />
      </div>
      <div className={classes.item}>
        <ModeButton
          currentMode={currentList.mode}
          points={currentList.pointTotal}
          maxPoints={legionModes[currentList.mode].maxPoints}
          handleChangeMode={handleChangeMode}
        />
      </div>
    </div>
  );
};

export default ListHeader;
