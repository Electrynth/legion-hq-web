import React, { useContext } from 'react';
import { Grid, Chip } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import ListContext from 'context/ListContext';
import CardIcon from 'common/CardIcon';
import cards from 'constants/cards';

const chipSize = 'medium';

function ListContingencies() {
  const {
    currentList,
    setCardPaneFilter,
    handleCardZoom,
    handleRemoveContingency
  } = useContext(ListContext);
  const getNumPips = (cardId) => {
    const card = cards[cardId];
    if (card.cardSubtype === '1') return '•';
    else if (card.cardSubtype === '2') return '••';
    else if (card.cardSubtype === '3') return '•••';
  }
  let numContingencies = 0;
  currentList.units.forEach((unit) => {
    const unitCard = cards[unit.unitId];
    if (unitCard.contingencies && unitCard.contingencies > 0)
      numContingencies += unitCard.contingencies
  });
  if (numContingencies === 0) return null;
  const chipStyle = { marginRight: 4, marginBottom: 4 };
  return (
    <Grid container id="list-contingencies" direction="row" justify="center">
      <Grid item>
        {currentList.contingencies.length < numContingencies && (
          <Chip
            size={chipSize}
            label="Contingency"
            icon={<AddIcon />}
            style={chipStyle}
            onClick={() => setCardPaneFilter({ action: 'CONTINGENCY' })}
          />
        )}
      </Grid>
      {currentList.contingencies.map((cardId, contingencyIndex) => (
        <Grid item key={cardId}>
          <Chip
            label={`${getNumPips(cardId)} ${cards[cardId].cardName}`}
            avatar={
              <CardIcon
                size="small"
                cardType="command"
                card={cards[cardId]}
                imageName={cards[cardId].imageName}
                handleClick={() => handleCardZoom(cardId)}
              />
            }
            style={chipStyle}
            onDelete={() => handleRemoveContingency(contingencyIndex)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListContingencies;
