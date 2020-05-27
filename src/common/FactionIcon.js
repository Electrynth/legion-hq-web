import React, { useContext } from 'react';
import { Avatar, Icon } from '@material-ui/core';
import DataContext from 'context/DataContext';
import factions from 'constants/factions';
import themes from 'constants/themes';

function FactionIcon({ faction, isAvatar, style }) {
  const { userSettings } = useContext(DataContext);
  const { themeColor } = userSettings;
  if (faction in factions) {
    const paletteType = themes.palettes[themeColor].type;
    if (isAvatar) {
      return (
        <Avatar
          alt={faction}
          src={factions[faction].icon[paletteType]}
          style={style}
        />
      );
    } else {
      return (
        <Icon color="error">
          <img
            alt={faction}
            src={factions[faction].icon[paletteType]}
            style={style ? style : { marginBottom: 5 }}
          />
        </Icon>
      );
    }
  } else return <div />;
};

export default FactionIcon;
