import React from 'react';
import { Chip } from '@material-ui/core';

function ChipCard({ card, handleClick, chipSize, handleDelete }) {
  const { cardName, displayName } = card;
  let pips = '';
  if (card.cardSubtype === '1') pips = '•';
  else if (card.cardSubtype === '2') pips = '••';
  else if (card.cardSubtype === '3') pips = '•••';
  let label = displayName ? displayName : cardName;
  if (pips) label = `${pips} ${label}`;
  return (
    <Chip
      clickable
      size={chipSize}
      label={label}
      onClick={handleClick}
      onDelete={handleDelete}
      style={{ marginBottom: 4, marginLeft: 4 }}
    />
  );
};

export default ChipCard;
