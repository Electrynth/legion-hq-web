import React, { useContext } from 'react';
import Img from 'react-image';
import { Chip, Typography, Badge } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import DataContext from 'context/DataContext';
import urls from 'constants/urls';
import factions from 'constants/factions';
import cards from 'constants/cards';

function findFirstCommanderId (list) {
  for (let i = 0; i < list.units.length; i++) {
    const card = cards[list.units[i].unitId];
    if (card.rank === 'commander') return card.id;
  }
  return undefined;
}

function ListChip({ userList, deleteUserList }) {
  const { goToPage } = useContext(DataContext);
  if (userList.faction in factions) {
    const factionTheme = createMuiTheme({
      palette: {
        primary: { main: factions[userList.faction].primaryColor },
        secondary: { main: factions[userList.faction].secondaryColor }
      }
    });
    const card = cards[findFirstCommanderId(userList)];
    return (
      <ThemeProvider theme={factionTheme}>
        <Badge max={10000} color="secondary" badgeContent={userList.pointTotal}>
          <Chip
            clickable
            color="primary"
            style={{ margin: '0 5 5 0' }}
            avatar={card ? (
              <Img
                alt={card.cardName}
                src={`${urls.cdn}/unitIcons/${card.imageName}`}
                style={{
                  marginLeft: 0,
                  width: 44,
                  height: 32,
                  borderRadius: 20
                }}
              />
            ) : undefined}
            label={(
              <Typography variant="subtitle1">
                {userList.title.length > 20 ? `${userList.title}...` : userList.title}
              </Typography>
            )}
            onClick={() => goToPage(`/list/${userList.listId}`)}
            onDelete={() => deleteUserList(userList.listId)}
          />
        </Badge>
      </ThemeProvider>
    );
  } else return <div />;
};

export default ListChip;
