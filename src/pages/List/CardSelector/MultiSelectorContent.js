import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  Collapse,
  Typography,
  Divider,
  IconButton
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import LegionCard from 'common/LegionCard';

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: { transform: 'rotate(180deg)' },
  rowContainerWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  rowContainerNoWrap: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 4
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  item: {
    marginRight: 4,
    marginBottom: 4
  },
  divider: {
    flexGrow: 1
  }
}));

function CollapsedContent({ children, isExpanded }) {
  return (
    <Collapse unmountOnExit timeout="auto" in={isExpanded}>
      {children}
    </Collapse>
  );
}

function MultiSelectorContent({
  action,
  validIds = [],
  invalidIds = [],
  equippedIds = [],
  handleClick,
  handleCardZoom
}) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
  if (validIds.length === 0) {
    return (
      <div className={classes.columnContainer}>
        <Typography>No eligible cards found</Typography>
      </div>
    );
  }
  return (
    <div className={classes.columnContainer}>
      <div className={classes.rowContainerWrap} style={{ alignItems: 'center' }}>
        <Typography style={{ marginRight: 8 }}>
          Eligible Commands
        </Typography>
        <Divider className={classes.divider} />
      </div>
      <div className={classes.rowContainerWrap}>
        {validIds.map(id => (
          <LegionCard
            key={id}
            id={id}
            isSelected={equippedIds.includes(id)}
            handleClick={() => handleClick(id)}
            handleCardZoom={() => handleCardZoom(id)}
          />
        ))}
      </div>
      {invalidIds.length > 0 && (
        <div className={classes.rowContainerNoWrap}>
          <Typography style={{ marginRight: 8 }}>
            Ineligible Commands
          </Typography>
          <Divider className={classes.divider} />
          <IconButton
            size="small"
            className={clsx(classes.expand, {
              [classes.expandOpen]: isExpanded,
            })}
            style={{ marginLeft: 8 }}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      )}
      <CollapsedContent isExpanded={isExpanded}>
        <div className={classes.rowContainerWrap}>
          {invalidIds.map(id => (
            <LegionCard
              key={id}
              id={id}
              isBasic={true}
              handleCardZoom={() => handleCardZoom(id)}
            />
          ))}
        </div>
      </CollapsedContent>
    </div>
  );
};

export default MultiSelectorContent;
