import React from 'react';
import Typography from '@material-ui/core/Typography';
import cards from 'constants/cards';

function CardName({ id, variant = 'body1' }) {
  const card = cards[id];
  return (
    <Typography variant={variant}>
      {card.displayName ? card.displayName : card.cardName}
    </Typography>
  );
};

export default CardName;
