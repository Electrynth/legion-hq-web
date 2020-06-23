import React from 'react';
import { Divider, Chip, Button, IconButton, Icon, Typography } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';
import CardIcon from 'common/CardIcon';
import cards from 'constants/cards';
import loadoutIcon from 'assets/loadout.png';

function UpgradeLabel({ card, handleSwapUpgrade, handleChangeLoadout }) {
  if (handleChangeLoadout) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2">
          {`${card.displayName ?
            card.displayName :
            card.cardName} (${card.cost})`}
        </Typography>
        {Boolean(handleChangeLoadout) && (
          <IconButton
            size="small"
            onClick={handleChangeLoadout}
            style={{ zIndex: 1, marginLeft: 4, width: 26, height: 26 }}
          >
            <Icon>
              <img
                alt="loadout"
                src={loadoutIcon}
                style={{ width: 14, height: 19, marginBottom: 1 }}
              />
            </Icon>
          </IconButton>
        )}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        disableRipple
        size="small"
        onClick={handleSwapUpgrade}
        style={{ textTransform: 'none' }}
      >
        <Typography variant="body2">
          {`${card.displayName ?
            card.displayName :
            card.cardName} (${card.cost})`}
        </Typography>
      </Button>
      {Boolean(handleChangeLoadout) && (
        <IconButton
          size="small"
          onClick={handleChangeLoadout}
          style={{ zIndex: 1, marginLeft: 4, width: 26, height: 26 }}
        >
          <Icon>
            <img
              alt="loadout"
              src={loadoutIcon}
              style={{ width: 14, height: 19, marginBottom: 1 }}
            />
          </Icon>
        </IconButton>
      )}
    </div>
  );
}

function LoadoutLabel({
  upgradeCard, loadoutCard, handleChangeLoadout, handleDeleteLoadout
}) {
  return (
    <div style={{ alignItems: 'flex-start', flexFlow: 'column nowrap' }}>
      <UpgradeLabel
        card={upgradeCard}
        handleChangeLoadout={handleChangeLoadout}
      />
      <Divider />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2">
            {`${loadoutCard.displayName ?
              loadoutCard.displayName :
              loadoutCard.cardName} (${loadoutCard.cost})`}
          </Typography>
          <IconButton
            size="small"
            onClick={handleDeleteLoadout}
            style={{ marginLeft: 4 }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </div>
    </div>
  );
}

function UpgradeAvatar({ card, handleClick }) {
  return (
    <CardIcon
      size="small"
      cardType="upgrade"
      cardName={card.cardName}
      imageName={card.imageName}
      handleClick={handleClick}
    />
  );
}

function UpgradeChip({
  chipSize = 'medium',
  upgradeInteractions,
  upgradeId,
  loadoutId,
  handleClick,
  handleSwap,
  handleDelete,
  handleChangeLoadout,
  handleDeleteLoadout
}) {
  const upgradeCard = cards[upgradeId];
  const loadoutCard = cards[loadoutId];
  let pointDelta = 0;
  if (upgradeInteractions && upgradeId in upgradeInteractions) {
    pointDelta = upgradeInteractions[upgradeId];
  }
  return (
    <Chip
      size={chipSize}
      label={loadoutCard ? (
        <LoadoutLabel
          upgradeCard={{ ...upgradeCard, cost: upgradeCard.cost + pointDelta }}
          loadoutCard={loadoutCard}
          handleChangeLoadout={handleChangeLoadout}
          handleDeleteLoadout={handleDeleteLoadout}
        />
      ) : (
        <UpgradeLabel
          card={{ ...upgradeCard, cost: upgradeCard.cost + pointDelta }}
          handleSwapUpgrade={handleSwap}
          handleChangeLoadout={handleChangeLoadout}
        />
      )}
      avatar={<UpgradeAvatar card={upgradeCard} handleClick={handleClick} />}
      style={{ marginRight: 4, marginTop: 4, marginBottom: 6, height: 'auto' }}
      onDelete={handleDelete}
    />
  );
};

export default UpgradeChip;
