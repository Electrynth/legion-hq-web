import React from 'react';
import ListContext from 'context/ListContext';
import DragDropContainer from './DragDropContainer';
import ListUnit from './ListUnit';
import CounterpartUnit from './CounterpartUnit';
import cards from 'constants/cards';

function ListUnits() {
  const {
    currentList,
    reorderUnits,
    setCardPaneFilter,
    handleUnequipUpgrade,
    handleCardZoom,
    handleIncrementUnit,
    handleDecrementUnit,
    handleRemoveCounterpart
  } = React.useContext(ListContext);

  const items = currentList.units.map((unit, unitIndex) => {
    const unitCard = cards[unit.unitId];
    const { counterpartId } = unitCard;
    const counterpartCard = cards[counterpartId];
    const { loadoutUpgrades } = unit;
    const hasLoadout = loadoutUpgrades ? loadoutUpgrades.length > 0 : false;
    let counterpartUnit;
    let addCounterpartHandler;
    let removeCounterpartHandler;
    const addUpgradeHandlers = [];
    const zoomUpgradeHandlers = [];
    const swapUpgradeHandlers = [];
    const deleteUpgradeHandlers = [];
    const changeLoadoutHandlers = [];
    const deleteLoadoutHandlers = [];
    const totalUpgradeBar = [...unitCard.upgradeBar, ...unit.additionalUpgradeSlots];
    if (counterpartId && !currentList.uniques.includes(counterpartId)) {
      addCounterpartHandler = () => setCardPaneFilter({
        action: 'COUNTERPART', unitIndex, counterpartId
      });
    } else if (counterpartId && currentList.uniques.includes(counterpartId)) {
      const cAddUpgradeHandlers = [];
      const cSwapUpgradeHandlers = [];
      const cZoomUpgradeHandlers = [];
      const cDeleteUpgradeHandlers = [];
      const cChangeLoadoutHandlers = [];
      const cDeleteLoadoutHandlers = [];
      const counterpart = unit.counterpart;
      const cLoadoutUpgrades = counterpart.loadoutUpgrades;
      removeCounterpartHandler = () => handleRemoveCounterpart(unitIndex);
      counterpart.upgradesEquipped.forEach((upgradeId, upgradeIndex) => {
        const upgradeType = counterpartCard.upgradeBar[upgradeIndex];
        if (upgradeId) {
          cZoomUpgradeHandlers.push(() => handleCardZoom(upgradeId));
          cSwapUpgradeHandlers.push(() => setCardPaneFilter({
            action: 'COUNTERPART_UPGRADE',
            upgradeType, unitIndex, upgradeIndex, counterpartId,
            upgradesEquipped: counterpart.upgradesEquipped,
            additionalUpgradeSlots: []
          }));
          cAddUpgradeHandlers.push(undefined);
          cDeleteUpgradeHandlers.push(() => handleUnequipUpgrade(
            'COUNTERPART_UPGRADE', unitIndex, upgradeIndex
          ));
          if (hasLoadout && Boolean(cLoadoutUpgrades[upgradeIndex])) {
            cChangeLoadoutHandlers.push(() => setCardPaneFilter({
              action: 'COUNTERPART_LOADOUT_UPGRADE',
              upgradeType, unitIndex, upgradeIndex, counterpartId,
              upgradesEquipped: counterpart.upgradesEquipped,
              additionalUpgradeSlots: []
            }));
            cDeleteLoadoutHandlers.push(() => handleUnequipUpgrade(
              'COUNTERPART_LOADOUT_UPGRADE', unitIndex, upgradeIndex
            ));
          } else if (hasLoadout && !cLoadoutUpgrades[upgradeIndex]) {
            cChangeLoadoutHandlers.push(() => setCardPaneFilter({
              action: 'COUNTERPART_LOADOUT_UPGRADE',
              upgradeType, unitIndex, upgradeIndex, counterpartId,
              upgradesEquipped: counterpart.upgradesEquipped,
              additionalUpgradeSlots: []
            }));
            cDeleteLoadoutHandlers.push(undefined)
          }
        } else {
          cZoomUpgradeHandlers.push(undefined);
          cSwapUpgradeHandlers.push(undefined);
          cAddUpgradeHandlers.push(() => setCardPaneFilter({
            action: 'COUNTERPART_UPGRADE',
            upgradeType, unitIndex, upgradeIndex, counterpartId,
            upgradesEquipped: counterpart.upgradesEquipped,
            additionalUpgradeSlots: []
          }));
          cDeleteUpgradeHandlers.push(undefined);
          if (hasLoadout) {
            cChangeLoadoutHandlers.push(undefined);
            cDeleteLoadoutHandlers.push(undefined);
          }
        }
      });
      counterpartUnit = (
        <CounterpartUnit
          counterpart={unit.counterpart}
          counterpartId={counterpartId}
          counterpartCard={counterpartCard}
          unitIndex={unitIndex}
          handleCardZoom={() => handleCardZoom(counterpartId)}
          handleRemoveCounterpart={removeCounterpartHandler}
          zoomUpgradeHandlers={cZoomUpgradeHandlers}
          swapUpgradeHandlers={cSwapUpgradeHandlers}
          addUpgradeHandlers={cAddUpgradeHandlers}
          deleteUpgradeHandlers={cDeleteUpgradeHandlers}
          changeLoadoutHandlers={cChangeLoadoutHandlers}
          deleteLoadoutHandlers={cDeleteLoadoutHandlers}
        />
      );
    }

    unit.upgradesEquipped.forEach((upgradeId, upgradeIndex) => {
      const upgradeType = totalUpgradeBar[upgradeIndex];
      if (upgradeId) {
        zoomUpgradeHandlers.push(() => handleCardZoom(upgradeId));
        addUpgradeHandlers.push(undefined);
        swapUpgradeHandlers.push(() => setCardPaneFilter({
          action: 'UNIT_UPGRADE',
          upgradeType, unitIndex, upgradeIndex,
          hasUniques: unit.hasUniques,
          unitId: unitCard.id,
          upgradesEquipped: unit.upgradesEquipped,
          additionalUpgradeSlots: unit.additionalUpgradeSlots
        }));
        deleteUpgradeHandlers.push(() => handleUnequipUpgrade(
          'UNIT_UPGRADE', unitIndex, upgradeIndex
        ));
        if (hasLoadout && loadoutUpgrades[upgradeIndex]) {
          changeLoadoutHandlers.push(() => setCardPaneFilter({
            action: 'LOADOUT_UPGRADE',
            upgradeType, unitIndex, upgradeIndex,
            unitId: unitCard.id,
            upgradesEquipped: unit.upgradesEquipped,
            additionalUpgradeSlots: unit.additionalUpgradeSlots
          }));
          deleteLoadoutHandlers.push(() => handleUnequipUpgrade(
            'LOADOUT_UPGRADE', unitIndex, upgradeIndex
          ));
        } else if (hasLoadout && !loadoutUpgrades[upgradeIndex]) {
          changeLoadoutHandlers.push(() => setCardPaneFilter({
            action: 'LOADOUT_UPGRADE',
            upgradeType, unitIndex, upgradeIndex,
            unitId: unitCard.id,
            upgradesEquipped: unit.upgradesEquipped,
            additionalUpgradeSlots: unit.additionalUpgradeSlots
          }));
          deleteLoadoutHandlers.push(undefined)
        }
      } else {
        zoomUpgradeHandlers.push(undefined);
        swapUpgradeHandlers.push(undefined);
        addUpgradeHandlers.push(() => setCardPaneFilter({
          action: 'UNIT_UPGRADE',
          upgradeType, unitIndex, upgradeIndex,
          hasUniques: unit.hasUniques,
          unitId: unitCard.id,
          upgradesEquipped: unit.upgradesEquipped,
          additionalUpgradeSlots: unit.additionalUpgradeSlots
        }));
        deleteUpgradeHandlers.push(undefined);
        if (hasLoadout) {
          changeLoadoutHandlers.push(undefined);
          deleteLoadoutHandlers.push(undefined);
        }
      }
    });
    return {
      id: unit.unitObjectString,
      component: (
        <ListUnit
          unit={unit}
          uniques={currentList.uniques}
          unitCard={unitCard}
          unitIndex={unitIndex}
          counterpartId={counterpartId}
          counterpartUnit={counterpartUnit}
          handleCardZoom={() => handleCardZoom(unit.unitId)}
          handleDecrementUnit={() => handleDecrementUnit(unitIndex)}
          handleIncrementUnit={() => handleIncrementUnit(unitIndex)}
          addCounterpartHandler={addCounterpartHandler}
          removeCounterpartHandler={removeCounterpartHandler}
          zoomUpgradeHandlers={zoomUpgradeHandlers}
          swapUpgradeHandlers={swapUpgradeHandlers}
          addUpgradeHandlers={addUpgradeHandlers}
          deleteUpgradeHandlers={deleteUpgradeHandlers}
          changeLoadoutHandlers={changeLoadoutHandlers}
          deleteLoadoutHandlers={deleteLoadoutHandlers}
        />
      )
    }
  });
  return (
    <div id="list-units" style={{ display: 'flex', flexFlow: 'column' }}>
      <DragDropContainer items={items} reorderUnits={reorderUnits} />
    </div>
  );
};

export default ListUnits;
