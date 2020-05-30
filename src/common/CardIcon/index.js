import React from 'react';
import clsx from 'clsx';
import Img from 'react-image';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import urls from 'constants/urls';

const useStyles = makeStyles(theme => ({
  card: { width: 315, marginRight: 4, marginBottom: 4 },
  large: { width: 62.5, height: 50 },
  medium: { width: 50, height: 40 },
  small: { width: 40, height: 32 },
  image: { objectFit: 'cover', marginLeft: 0, borderRadius: 25 },
  imageHover: { '&:hover': { cursor: 'pointer' } }
}));

function CardIcon({
  size = 'large',
  cardName,
  cardType,
  imageName,
  handleClick
}) {
  const classes = useStyles();
  const placeholder = (
    <Skeleton
      variant="rect"
      className={classes[size]}
      style={{ borderRadius: 25 }}
    />
  );
  return (
    <Img
      decode={false}
      alt={cardName}
      src={`${urls.cdn}/${cardType}Icons/${imageName}`}
      loader={placeholder}
      className={clsx(classes.image, classes[size], {
        [classes.imageHover]: handleClick !== undefined
      })}
      onClick={handleClick}
    />
  );
};

export default CardIcon;
