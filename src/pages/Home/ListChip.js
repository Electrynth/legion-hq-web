import React from 'react';
import Img from 'react-image';
import { Chip, Typography, Badge, Menu, MenuItem } from '@material-ui/core';
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
  const { goToPage } = React.useContext(DataContext);
  const [anchorEl, setAnchorEl] = React.useState();
  const handleOpenDeleteMenu = event => setAnchorEl(event.currentTarget);
  const handleCloseDeleteMenu = () => setAnchorEl(null);
  if (userList.faction in factions) {
    const factionTheme = createMuiTheme({
      palette: {
        primary: { main: factions[userList.faction].primaryColor },
        secondary: { main: factions[userList.faction].secondaryColor }
      }
    });
    const card = cards[findFirstCommanderId(userList)];
    return (
      <React.Fragment>
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
              onDelete={handleOpenDeleteMenu}
            />
          </Badge>
        </ThemeProvider>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseDeleteMenu}
        >
          <Typography variant="caption" style={{ padding: '0 16px' }}>
            Delete {userList.title}?
          </Typography>
          <MenuItem
            onClick={() => {
              handleCloseDeleteMenu();
              deleteUserList(userList.listId);
            }}
          >
            Yes
          </MenuItem>
          <MenuItem onClick={handleCloseDeleteMenu}>
            No
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  } else return <div />;
};

export default ListChip;
