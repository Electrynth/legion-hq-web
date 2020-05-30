import React from 'react';
import AddCounterpartButton from './AddCounterpartButton';
import AddUpgradeButton from './AddUpgradeButton';
import UpgradeChip from './UpgradeChip';

function UnitUpgrades({
  counterpartId,
  upgradesEquipped,
  upgradeInteractions,
  totalUpgradeBar,
  loadoutUpgrades,
  addCounterpartHandler,
  removeCounterpartHandler,
  zoomUpgradeHandlers,
  swapUpgradeHandlers,
  addUpgradeHandlers,
  deleteUpgradeHandlers,
  changeLoadoutHandlers,
  deleteLoadoutHandlers
}) {
  const addCounterpartButtons = [];
  const addUpgradesButtons = [];
  const upgradeChips = [];
  const hasLoadout = loadoutUpgrades ? loadoutUpgrades.length > 0 : false;
  if (addCounterpartHandler) {
    addCounterpartButtons.push(
      <AddCounterpartButton
        key={counterpartId}
        counterpartId={counterpartId}
        handleClick={addCounterpartHandler}
      />
    );
  }
  upgradesEquipped.forEach((upgradeId, upgradeIndex) => {
    if (upgradeId) {
      upgradeChips.push(
        <UpgradeChip
          key={upgradeId}
          upgradeId={upgradeId}
          upgradeInteractions={upgradeInteractions}
          loadoutId={hasLoadout ? loadoutUpgrades[upgradeIndex] : undefined}
          handleClick={zoomUpgradeHandlers[upgradeIndex]}
          handleSwap={swapUpgradeHandlers[upgradeIndex]}
          handleDelete={deleteUpgradeHandlers[upgradeIndex]}
          handleChangeLoadout={changeLoadoutHandlers[upgradeIndex]}
          handleDeleteLoadout={deleteLoadoutHandlers[upgradeIndex]}
        />
      );
    } else {
      addUpgradesButtons.push(
        <AddUpgradeButton
          key={`${totalUpgradeBar[upgradeIndex]}_${upgradeIndex}`}
          type={totalUpgradeBar[upgradeIndex]}
          handleClick={addUpgradeHandlers[upgradeIndex]}
        />
      );
    }
  });
  return (
    <div style={{ flex: 'display', flexFlow: 'row wrap', alignItems: 'center' }}>
      {addCounterpartButtons}
      {addUpgradesButtons}
      {upgradeChips}
    </div>
  );
};

export default UnitUpgrades;
