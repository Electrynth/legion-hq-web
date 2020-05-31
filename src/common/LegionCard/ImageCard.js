import React from 'react';
import {
  Grow,
  IconButton,
  Collapse,
  Button,
  Card,
  CardMedia,
  CardActions,
  CardActionArea
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import CardChip from 'common/CardChip';
import KeywordChips from 'common/KeywordChips';
import urls from 'constants/urls';

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    })
  },
  expandOpen: { transform: 'rotate(180deg)' },
  selected: { border: '1px solid lightblue' },
  card: { marginRight: 4, marginBottom: 4 },
  unitCard: { maxWidth: 315 },
  commandCard: { maxWidth: 225 },
  upgradeCard: { maxWidth: 150 },
  unitImage: { width: 315, height: 225 },
  upgradeImage: { width: 150, height: 232.5 },
  commandImage: { width: 225, height: 315 },
  doubleUpgrade: { width: 300 }
}));

function ImageCard({ isSelected, card, handleClick, handleCardZoom }) {
  const chipSize = 'small';
  const { cost, cardType, cardName, displayName, keywords, imageName } = card;
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
  const isDoubleSided = cardType === 'upgrade' && keywords.includes('Reconfigure');
  const isSkirmish = card.keywords.includes('Skirmish');
  return (
    <Grow unmountOnExit in={true}>
      <Card
        className={clsx(classes.card,
          { [classes.selected]: isSelected },
          { [classes.unitCard]: cardType === 'unit' },
          { [classes.unitCard]: cardType === 'battle' && !isSkirmish },
          { [classes.commandCard]: cardType === 'battle' && isSkirmish },
          { [classes.upgradeCard]: cardType === 'upgrade' && ! isDoubleSided },
          { [classes.doubleUpgrade]: isDoubleSided },
          { [classes.commandCard]: cardType === 'command' },
        )}
      >
        <CardActionArea onClick={handleClick}>
          <CardMedia
            title={displayName ? displayName : cardName}
            image={`${urls.cdn}/${cardType}Cards/${imageName}`}
            className={clsx(
              { [classes.unitImage]: cardType === 'unit' || cardType === 'counterpart' },
              { [classes.unitImage]: cardType === 'battle' && !isSkirmish },
              { [classes.commandImage]: cardType === 'battle' && isSkirmish },
              { [classes.upgradeImage]: cardType === 'upgrade' },
              { [classes.commandImage]: cardType === 'command' },
              { [classes.doubleUpgrade]: isDoubleSided }
            )}
          />
        </CardActionArea>
        <CardActions disableSpacing>
          {cost && <CardChip type="points" value={cost} size={chipSize} />}
          <IconButton
            size="small"
            aria-expanded={isExpanded}
            className={clsx(classes.expand, {
              [classes.expandOpen]: isExpanded,
            })}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse unmountOnExit timeout="auto" in={isExpanded}>
          {keywords.length > 0 && (
            <CardActions className={classes.card}>
              <KeywordChips size={chipSize} keywords={keywords} />
            </CardActions>
          )}
          <CardActions>
            <Button
              size="small"
              style={{ marginLeft: 'auto' }}
              onClick={handleCardZoom}
            >
              Show More
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    </Grow>
  );
};

export default ImageCard;
