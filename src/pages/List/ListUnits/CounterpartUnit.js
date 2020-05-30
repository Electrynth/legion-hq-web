import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UnitAvatar from 'common/UnitAvatar';
import CardName from 'common/CardName';
import UnitPoints from 'common/UnitPoints';
import UnitActions from './UnitActions';
import UnitUpgrades from './UnitUpgrades';

const useStyles = makeStyles(theme => ({
  unitRow: {
    marginLeft: 25,
    display: 'flex',
    flexFlow: 'row nowrap'
  },
  leftCell: { marginRight: 4 },
  counterpart: { marginLeft: 20 },
  middleCell: {
    flex: 1,
    marginRight: 2,
    display: 'flex',
    flexFlow: 'column nowrap',
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  rightCell: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    borderLeft: '1px solid rgba(255,255,255,0.12)',
    borderTop: '1px solid rgba(255,255,255,0.12)'
  }
}));

function CounterpartUnit({
  counterpart,
  counterpartId,
  counterpartCard,
  unitIndex,
  handleCardZoom,
  handleRemoveCounterpart,
  zoomUpgradeHandlers,
  swapUpgradeHandlers,
  addUpgradeHandlers,
  deleteUpgradeHandlers,
  changeLoadoutHandlers,
  deleteLoadoutHandlers
}) {
  const classes = useStyles();
  const avatar = (
    <UnitAvatar
      key="avatar"
      id={counterpartId}
      handleClick={handleCardZoom}
    />
  );
  const name = <CardName key="name" id={counterpartId} />;
  const points = <UnitPoints key="points" unit={counterpart} />;
  const actions = (
    <UnitActions key="actions" decrementUnit={handleRemoveCounterpart} />
  );
  const upgrades = (
    <UnitUpgrades
      key="upgrades"
      upgradesEquipped={counterpart.upgradesEquipped}
      totalUpgradeBar={counterpartCard.upgradeBar}
      loadoutUpgrades={counterpart.loadoutUpgrades}
      zoomUpgradeHandlers={zoomUpgradeHandlers}
      swapUpgradeHandlers={swapUpgradeHandlers}
      addUpgradeHandlers={addUpgradeHandlers}
      deleteUpgradeHandlers={deleteUpgradeHandlers}
      changeLoadoutHandlers={changeLoadoutHandlers}
      deleteLoadoutHandlers={deleteLoadoutHandlers}
    />
  );
  const leftCell = [avatar];
  const middleCell = [name, upgrades];
  const rightCell = [points, actions];
  return (
    <div className={classes.unitRow}>
      <div className={classes.leftCell}>
        {leftCell}
      </div>
      <div className={classes.middleCell}>
        {middleCell}
      </div>
      <div className={classes.rightCell}>
        {rightCell}
      </div>
    </div>
  );
};

export default CounterpartUnit;
