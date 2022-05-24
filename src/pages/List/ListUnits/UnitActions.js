import React, { useState } from 'react';
import { Button, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  PlusOne as PlusOneIcon,
  Add as PlusIcon,
  Remove as NegativeIcon,
  ExposureNeg1 as MinusOneIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';
import { Icon as IconifyIcon } from '@iconify/react';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    minWidth: '72px'
  }
}));

function UnitActions({
  incrementUnit = undefined,
  decrementUnit,
  isKillPointMode,
  handleAddKillPoints,
  handleRemoveKillPoints
}) {
  const [numKilled, setNumKilled] = useState(0);
  const classes = useStyles();
  const fontSize = 26;
  if (isKillPointMode) {
    return (
      <div className={classes.buttons}>
        <Button
          size="small"
          onClick={() => {
            setNumKilled(numKilled - 1);
            handleRemoveKillPoints();
          }}
          style={{ marginLeft: 2, marginRight: 1 }}
        >
          <NegativeIcon style={{ fontSize: 13 }} />
          <IconifyIcon style={{ fontSize: 21 }} icon="fa-solid:skull-crossbones" />
        </Button>
        <Button

          variant="contained"
          size="small"
          onClick={() => {
            setNumKilled(numKilled + 1);
            handleAddKillPoints();
          }}
          style={{ marginLeft: 1, marginRight: 2 }}
        >
          <PlusIcon style={{ fontSize: 13 }} />
          <IconifyIcon style={{ fontSize: 21 }} icon="fa-solid:skull-crossbones" />
          <Typography
            variant="caption"
            style={{ marginLeft: 2 }}
          >
            {numKilled > 0 ? `(${numKilled})` : ''}
          </Typography>
        </Button>
      </div>
    );
  } else {
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
        ) : (
          <IconButton
            size="small"
            onClick={decrementUnit}
          >
            <DeleteIcon style={{ fontSize }} />
          </IconButton>
        )}
      </div>
    );
  }
};

export default UnitActions;
