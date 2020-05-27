import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ranks from 'constants/ranks';
import upgradeTypes from 'constants/upgradeTypes';

const useStyles = makeStyles(theme => ({
  outerRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: -10
  },
  innerColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  numberSpan: {
    width: 22,
    height: 22,
    borderRadius: 25,
    left: 12,
    backgroundColor: 'white',
    position: 'relative',
    border: '1px solid #1e2125'
  },
  imageSpan: {
    width: 22,
    height: 22,
    borderRadius: 25,
    left: 12,
    top: 1,
    backgroundColor: 'white',
    position: 'relative',
    border: '1px solid #1e2125'
  },
  typography: { bottom: 2, left: 6, color: 'black', position: 'relative' },
  smallTypography: { bottom: 2, left: 1.5, color: 'black', position: 'relative' },
  image: { width: 20, height: 20 },
  hidden: { visibility: 'hidden' }
}));

function IconBadge({ avatar, count = 1, upgradeType, rank }) {
  const classes = useStyles();
  let alt = ''; let src = '';
  if (upgradeType && upgradeType in upgradeTypes) {
    alt = upgradeType;
    src = upgradeTypes[upgradeType].icon;
  } else if (rank && rank in ranks) {
    alt = rank;
    src = ranks[rank].icon;
  }
  return (
    <div className={classes.outerRowContainer}>
      <div className={classes.innerColumnContainer}>
        <span
          className={clsx(classes.numberSpan, {
            [classes.hidden]: count < 2
          })}
        >
          <Typography
            variant="button"
            className={clsx(
              { [classes.typography]: count < 10 },
              { [classes.smallTypography]: count > 9 }
            )}
          >
            {count}
          </Typography>
        </span>
        <span className={classes.imageSpan}>
          <img alt={alt} src={src} className={classes.image} />
        </span>
      </div>
      {avatar}
    </div>
  );
};

export default IconBadge;
