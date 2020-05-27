import React, { useContext } from 'react';
import { Grid, Chip } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import ListContext from 'context/ListContext';
import CardIcon from 'common/CardIcon';
import cards from 'constants/cards';

const chipSize = 'medium';

function ListCommands() {
  const {
    currentList,
    setCardPaneFilter,
    handleCardZoom,
    handleRemoveCommand
  } = useContext(ListContext);
  const getNumPips = (cardId) => {
    const card = cards[cardId];
    if (card.cardSubtype === '1') return '•';
    else if (card.cardSubtype === '2') return '••';
    else if (card.cardSubtype === '3') return '•••';
  }
  const chipStyle = { marginRight: 4, marginBottom: 4 };
  return (
    <Grid container id="list-commands" direction="row" justify="center">
      {currentList.commandCards.length < 6 && (
        <Grid item>
          <Chip
            size={chipSize}
            label="Command"
            icon={<AddIcon />}
            style={chipStyle}
            onClick={() => setCardPaneFilter({ action: 'COMMAND' })}
          />
        </Grid>
      )}
      {currentList.commandCards.map((cardId, commandIndex) => (
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
            onDelete={() => handleRemoveCommand(commandIndex)}
          />
        </Grid>
      ))}
      <Grid item>
        <Chip
          label="•••• Standing Orders"
          avatar={
            <CardIcon
              size="small"
              cardType="command"
              imageName="Standing Orders.jpeg"
              card={cards['aa']}
              handleClick={() => handleCardZoom('aa')}
            />
          }
          style={chipStyle}
        />
      </Grid>
    </Grid>
  );
};

export default ListCommands;
