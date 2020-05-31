import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  Collapse,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grow,
  Divider
} from '@material-ui/core';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import CardChip from 'common/CardChip';
import KeywordChips from 'common/KeywordChips';
import CardIcon from 'common/CardIcon';
import IconBadge from 'common/IconBadge';
import UpgradeBar from 'common/UpgradeBar';

function capitalizeFirstLetters(words) {
  const strings = words.split(' ').map(string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  });
  return strings.join(' ');
}

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: { transform: 'rotate(180deg)' },
  card: { width: 315, marginRight: 4, marginBottom: 4 }
}));

function ReverseWrapper({ children }) {
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  };
  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
}

function TextCardHeader({ card, handleClick }) {
  if (card.cardType === 'unit') {
    return <UnitCardHeader card={card} handleClick={handleClick} />;
  } else if (card.cardType === 'upgrade') {
    return <UpgradeCardHeader card={card} handleClick={handleClick} />;
  } else if (card.cardType === 'counterpart') {
    return <CounterpartCardHeader card={card} handleClick={handleClick} />;
  } else if (card.cardType === 'command') {
    return <CommandCardHeader card={card} handleClick={handleClick} />;
  } else if (card.cardType === 'battle') {
    return <BattleCardHeader card={card} handleClick={handleClick} />;
  } else {
    return null;
  }
}

function TextCardContent({ card, chipSize }) {
  if (card.cardType === 'unit') {
    return <UnitCardContent card={card} chipSize={chipSize} />;
  } else if (card.cardType === 'upgrade') {
    return <UpgradeCardContent card={card} chipSize={chipSize} />;
  } else if (card.cardType === 'counterpart') {
    return <CounterpartCardContent card={card} chipSize={chipSize} />;
  } else if (card.cardType === 'command') {
    return <CommandCardContent card={card} chipSize={chipSize} />;
  } else if (card.cardType === 'battle') {
    return <BattleCardContent card={card} chipSize={chipSize} />;
  } else {
    return null;
  }
}

function CounterpartCardHeader({ card, handleClick }) {
  const { isUnique, displayName, cardName, imageName } = card;
  const avatar = (
    <CardIcon
      cardName={cardName}
      cardType="unit"
      imageName={imageName}
    />
  );
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{ margin: 8 }}>
      <AddIcon />
    </IconButton>
  );
  return (
    <CardHeader
      avatar={avatar}
      title={`${isUnique ? '• ' : ''}${displayName ? displayName : cardName}`}
      subheader={capitalizeFirstLetters(card.cardSubtype)}
      action={action}
      style={{ padding: 8 }}
    />
  );
}

function BattleCardHeader({ card, handleClick }) {
  const { cardName, cardType } = card;
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{ margin: 8 }}>
      <AddIcon />
    </IconButton>
  );
  const isSkirmish = card.keywords.includes('Skirmish');
  return (
    <CardHeader
      title={cardName}
      subheader={capitalizeFirstLetters(cardType) + 'Card' + isSkirmish ? '(Skirmish)' : ''}
      action={action}
      style={{ padding: 8 }}
    />
  );
}

function CommandCardHeader({ card, handleClick }) {
  const { cardName, cardType, imageName } = card;
  const avatar = (
    <CardIcon
      cardName={cardName}
      cardType={cardType}
      imageName={imageName}
    />
  );
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{ margin: 8 }}>
      <AddIcon />
    </IconButton>
  );
  return (
    <CardHeader
      avatar={avatar}
      title={cardName}
      subheader={capitalizeFirstLetters(cardType)}
      action={action}
      style={{ padding: 8 }}
    />
  );
}

function UpgradeCardHeader({ card, handleClick }) {
  const { isUnique, displayName, cardName, cardType, cardSubtype, imageName } = card;
  const avatar = (
    <IconBadge
      upgradeType={cardSubtype}
      avatar={
        <CardIcon
          cardName={cardName}
          cardType={cardType}
          imageName={imageName}
        />
      }
    />
  );
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{ margin: 8 }}>
      <AddIcon />
    </IconButton>
  );
  return (
    <CardHeader
      avatar={avatar}
      title={`${isUnique ? '• ' : ''}${displayName ? displayName : cardName}`}
      subheader={capitalizeFirstLetters(cardSubtype)}
      action={action}
      style={{ padding: 8 }}
    />
  );
}

function UnitCardHeader({ card, handleClick }) {
  const { rank, isUnique, displayName, cardName, cardSubtype } = card;
  const avatar = (
    <IconBadge
      rank={rank}
      avatar={
        <CardIcon
          cardName={card.cardName}
          cardType={card.cardType}
          imageName={card.imageName}
        />
      }
    />
  );
  const action = (
    <IconButton size="medium" onClick={handleClick} style={{ margin: 8 }}>
      <AddIcon />
    </IconButton>
  );
  return (
    <CardHeader
      avatar={avatar}
      title={`${isUnique ? '• ' : ''}${displayName ? displayName : cardName}`}
      subheader={capitalizeFirstLetters(cardSubtype)}
      action={action}
      style={{ padding: 8 }}
    />
  );
}

function CounterpartCardContent({ card, chipSize }) {
  const { cost, wounds } = card;
  return (
    <CardContent style={{ padding: 8, textAlign: 'right' }}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Cost
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <CardChip type="points" value={cost} size={chipSize} />
      </ReverseWrapper>
      <Divider style={{ marginBottom: 4 }} />
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Stats
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <CardChip type="wounds" value={wounds} size={chipSize} />
      </ReverseWrapper>
    </CardContent>
  );
}

function CommandCardContent({ card, chipSize }) {
  const { cardSubtype } = card;
  return (
    <CardContent style={{ padding: 8, textAlign: 'right' }}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Pips
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Typography variant="body1" style={{ marginRight: 16 }}>
          {cardSubtype}
        </Typography>
      </ReverseWrapper>
    </CardContent>
  );
}

function BattleCardContent({ card, chipSize }) {
  const { cardSubtype } = card;
  return (
    <CardContent style={{ padding: 8, textAlign: 'right' }}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Type
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Typography variant="body1" style={{ marginRight: 16 }}>
          {capitalizeFirstLetters(cardSubtype)}
        </Typography>
      </ReverseWrapper>
    </CardContent>
  );
}

function UpgradeCardContent({ card, chipSize }) {
  const { cost } = card;
  return (
    <CardContent style={{ padding: 8, textAlign: 'right' }}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Cost
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <CardChip type="points" value={cost} size={chipSize} />
      </ReverseWrapper>
    </CardContent>
  );
}

function UnitCardContent({ card, chipSize }) {
  const {
    cost,
    wounds,
    resilience,
    courage,
    speed,
    defense,
    surges,
    upgradeBar
  } = card;
  return (
    <CardContent style={{ padding: 8, textAlign: 'right' }}>
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">Cost</Typography>
        <div style={{ flexGrow: 1 }} />
        <CardChip type="points" value={cost} size={chipSize} />
      </ReverseWrapper>
      <Divider style={{ marginBottom: 4 }} />
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Stats
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <CardChip type="wounds" value={wounds} size={chipSize} />
        {resilience ? (
          <CardChip type="resilience" value={resilience} size={chipSize} />
        ) : (
          <CardChip type="courage" value={courage} size={chipSize} />
        )}
        <CardChip type="speed" value={speed} size={chipSize} />
        <CardChip type="defense" value={defense} size={chipSize} />
        <CardChip type="surges" value={surges} size={chipSize} />
      </ReverseWrapper>
      <Divider style={{ marginBottom: 4 }} />
      <ReverseWrapper>
        <Typography variant="body2" color="textSecondary">
          Upgrades
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <UpgradeBar upgradeBar={upgradeBar} />
      </ReverseWrapper>
    </CardContent>
  );
}

function TextCardActions({ card, chipSize, isExpanded, handleExpandClick }) {
  const classes = useStyles();
  return (
    <CardActions disableSpacing style={{ padding: '0 8px 8px' }}>
      <IconButton
        size="medium"
        className={clsx(classes.expand, {
          [classes.expandOpen]: isExpanded,
        })}
        onClick={handleExpandClick}
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions>
  );
}

function TextCardCollapsedContent({ card, chipSize, isExpanded, handleCardZoom }) {
  const { keywords } = card;
  return (
    <Collapse unmountOnExit timeout="auto" in={isExpanded}>
      {keywords.length > 0 && (
        <CardContent style={{ padding: 8 }}>
          <KeywordChips size={chipSize} keywords={keywords} />
        </CardContent>
      )}
      <CardActions>
        <Button
          size="medium"
          style={{ marginLeft: 'auto' }}
          onClick={handleCardZoom}
        >
          Show more
        </Button>
      </CardActions>
    </Collapse>
  );
}

function TextCard({ card, handleClick, handleCardZoom }) {
  const chipSize = 'small';
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
  return (
    <Grow unmountOnExit in={true}>
      <Card className={classes.card}>
        <TextCardHeader card={card} handleClick={handleClick} />
        <TextCardContent card={card} chipSize={chipSize} />
        <TextCardActions
          card={card}
          chipSize={chipSize}
          isExpanded={isExpanded}
          handleExpandClick={handleExpandClick}
        />
        <TextCardCollapsedContent
          card={card}
          isExpanded={isExpanded}
          chipSize={chipSize}
          handleCardZoom={handleCardZoom}
        />
      </Card>
    </Grow>
  );
};

export default TextCard;
