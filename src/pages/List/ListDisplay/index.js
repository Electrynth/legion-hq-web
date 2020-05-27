import React, { useContext } from 'react';
import { Fade, Typography, Divider } from '@material-ui/core';
import ListContext from 'context/ListContext';
import factions from 'constants/factions';
import CardImage from './CardImage';

function RowDisplay({ unit, faction, handleCardZoom }) {
  const counterStyles = {
    height: 150,
    width: 15,
    marginRight: 4,
    border: `1px solid ${factions[faction].primaryColor}`,
    borderRadius: 2.5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };
  // ×
  const counter = (
    <div style={counterStyles}>
      <Typography variant={unit.count > 9 ? 'caption' : 'button'}>
        {unit.count}
      </Typography>
    </div>
  );
  const { counterpart } = unit;
  return (
    <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
      <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
        {unit.count > 1 && counter}
        <CardImage
          id={unit.unitId}
          handleClick={() => handleCardZoom(unit.unitId)}
        />
        {unit.upgradesEquipped.map((upgradeId, i) => {
          if (upgradeId) {
            if (unit.loadoutUpgrades && unit.loadoutUpgrades[i]) {
              const loadoutUpgradeId = unit.loadoutUpgrades[i];
              return (
                <div key={upgradeId} style={{ display: 'flex', flexflow: 'row nowrap' }}>
                  <CardImage
                    id={upgradeId}
                    handleClick={() => handleCardZoom(upgradeId)}
                  />
                  <CardImage
                    id={loadoutUpgradeId}
                    isLoadout={true}
                    handleClick={() => handleCardZoom(loadoutUpgradeId)}
                  />
                </div>
              );
            } else {
              return (
                <CardImage
                  key={upgradeId}
                  id={upgradeId}
                  handleClick={() => handleCardZoom(upgradeId)}
                />
              );
            }
          } else return null;
        })}
      </div>
      {counterpart && (
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
          <CardImage
            id={counterpart.counterpartId}
            handleClick={() => handleCardZoom(counterpart.counterpartId)}
          />
          {counterpart.upgradesEquipped.map((upgradeId, i) => {
            if (upgradeId) {
              if (counterpart.loadoutUpgrades && counterpart.loadoutUpgrades[i]) {
                const loadoutUpgradeId = counterpart.loadoutUpgrades[i];
                return (
                  <div key={upgradeId} style={{ display: 'flex', flexflow: 'row nowrap' }}>
                    <CardImage
                      id={upgradeId}
                      handleClick={() => handleCardZoom(upgradeId)}
                    />
                    <CardImage
                      id={loadoutUpgradeId}
                      isLoadout={true}
                      handleClick={() => handleCardZoom(loadoutUpgradeId)}
                    />
                  </div>
                );
              } else {
                return (
                  <CardImage
                    key={upgradeId}
                    id={upgradeId}
                    handleClick={() => handleCardZoom(upgradeId)}
                  />
                );
              }
            } else return null;
          })}
        </div>
      )}
    </div>
  );
}

function CommandRow({ commandIds, handleCardZoom }) {
  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
      {commandIds.map(id => (
        <div key={id}>
          <CardImage
            key={id}
            id={id}
            handleClick={() => handleCardZoom(id)}
          />
        </div>
      ))}
    </div>
  );
}

function ListDisplay() {
  const { currentList, cardPaneFilter, handleCardZoom } = useContext(ListContext);
  return (
    <Fade unmountOnExit exit={false} in={cardPaneFilter.action === 'DISPLAY'}>
      <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'stretch' }}>
        {currentList.units.map(unit => (
          <div key={unit.unitObjectString}>
            <RowDisplay
              unit={unit}
              faction={currentList.faction}
              handleCardZoom={handleCardZoom}
            />
            <Divider style={{ marginBottom: 4 }} />
          </div>
        ))}
        <CommandRow
          commandIds={currentList.commandCards}
          handleCardZoom={handleCardZoom}
        />
      </div>
    </Fade>
  );
};

export default ListDisplay;
