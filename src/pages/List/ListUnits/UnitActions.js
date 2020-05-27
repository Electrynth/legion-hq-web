import React from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  PlusOne as PlusOneIcon,
  ExposureNeg1 as MinusOneIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    minWidth: '72px'
  }
}));

function UnitActions({ incrementUnit = undefined, decrementUnit }) {
  const classes = useStyles();
  const fontSize = 26;
  return (
    <div className={classes.buttons}>
      {incrementUnit ? (
        <React.Fragment>
          <IconButton
            size="small"
            onClick={decrementUnit}
            style={{ marginLeft: 2, marginRight: 1 }}
          >
            <MinusOneIcon style={{ fontSize }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={incrementUnit}
            style={{ marginLeft: 1, marginRight: 2 }}
          >
            <PlusOneIcon style={{ fontSize }} />
          </IconButton>
        </React.Fragment>
      ): (
        <IconButton
          size="small"
          onClick={decrementUnit}
        >
          <DeleteIcon style={{ fontSize }} />
        </IconButton>
      )}
    </div>
  );
};

export default UnitActions;
