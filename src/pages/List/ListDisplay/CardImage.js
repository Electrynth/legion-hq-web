import React from 'react';
import Img from 'react-image';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import cards from 'constants/cards';
import urls from 'constants/urls';

const useStyles = makeStyles(theme => ({
  container: {
    marginRight: 4,
    zIndex: 1,
    '&:hover': {
      transition: '.25s ease',
      cursor: 'pointer',
      opacity: 0.75
    }
  },
  loadoutContainer: {
    marginRight: 4,
    marginLeft: -50,
    zIndex: 0,
    '&:hover': {
      transition: '.25s ease',
      cursor: 'pointer',
      zIndex: 1,
      opacity: 0.75
    }
  },
  unit: { width: 210, height: 150 },
  upgrade: { width: 'auto', minWidth: 96, height: 150 },
  command: { width: 150, height: 210 },
  counterpart: { width: 210, height: 150 }
}));

function CardImage({ id, handleClick, isLoadout = false }) {
  const card = cards[id];
  const classes = useStyles();
  return (
    <div className={isLoadout ? classes.loadoutContainer : classes.container}>
      <Img
        alt={card.cardName}
        src={`${urls.cdn}/${card.cardType}Cards/${card.imageName}`}
        loader={<Skeleton variant="rect" className={classes[card.cardType]} />}
        className={classes[card.cardType]}
        onClick={handleClick}
      />
    </div>
  );
};

export default CardImage;
