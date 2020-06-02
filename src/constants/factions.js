import rebelsWhite from 'assets/factions/rebelsWhite.svg';
import rebelsBlack from 'assets/factions/rebelsBlack.svg';
import empireWhite from 'assets/factions/empireWhite.svg';
import empireBlack from 'assets/factions/empireBlack.svg';
import republicWhite from 'assets/factions/republicWhite.svg';
import republicBlack from 'assets/factions/republicBlack.svg';
import separatistsWhite from 'assets/factions/separatistsWhite.svg';
import separatistsBlack from 'assets/factions/separatistsBlack.svg';

const factions = {
  rebels: {
    name: 'Rebels',
    singular: 'Rebel',
    longName: 'Rebel Alliance',
    primaryColor: '#a91515',
    secondaryColor: '#b74f2c',
    tertiaryColor: '#b71c1c',
    icon: {
      dark: rebelsWhite,
      light: rebelsBlack
    }
  },
  empire: {
    name: 'Empire',
    singular: 'Empire',
    longName: 'Galactic Empire',
    primaryColor: '#6b6b6b',
    secondaryColor: '#a5a5a5',
    tertiaryColor: '#555555',
    icon: {
      dark: empireWhite,
      light: empireBlack
    }
  },
  republic: {
    name: 'Republic',
    singular: 'Republic',
    longName: 'Grand Army of the Republic',
    primaryColor: '#c49d36',
    secondaryColor: '#970897',
    tertiaryColor: '#97084f',
    icon: {
      dark: republicWhite,
      light: republicBlack
    }
  },
  separatists: {
    name: 'Separatists',
    singular: 'Separatist',
    longName: 'Separatist Alliance',
    forceAffinity: 'dark side',
    primaryColor: '#081a6e',
    secondaryColor: '#56609d',
    tertiaryColor: '#3f51b6',
    icon: {
      dark: separatistsWhite,
      light: separatistsBlack
    }
  }
};

export default factions;
