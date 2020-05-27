import wounds from 'static/wounds.png';
import resilience from 'static/resilience.png';
import courage from 'static/courage.png';
import blockSurgeLight from 'static/blockSurgeLight.png';
import blockSurgeDark from 'static/blockSurgeDark.png';
import critSurgeLight from 'static/critSurgeLight.png';
import critSurgeDark from 'static/critSurgeDark.png';
import hitSurgeLight from 'static/hitSurgeLight.png';
import hitSurgeDark from 'static/hitSurgeDark.png';
import redAttackDie from 'static/redAttackDie.png';
import blackAttackDie from 'static/blackAttackDie.png';
import whiteAttackDie from 'static/whiteAttackDie.png';
import redDefenseDie from 'static/redDefenseDie.png';
import whiteDefenseDie from 'static/whiteDefenseDie.png';

const symbols = {
  wounds: wounds,
  resilience: resilience,
  courage: courage,
  surge: {
    block: {
      light: blockSurgeLight,
      dark: blockSurgeDark
    },
    crit: {
      light: critSurgeLight,
      dark: critSurgeDark
    },
    hit: {
      light: hitSurgeLight,
      dark: hitSurgeDark
    }
  },
  attack: {
    red: redAttackDie,
    black: blackAttackDie,
    white: whiteAttackDie
  },
  defense: {
    red: redDefenseDie,
    white: whiteDefenseDie
  }
};

export default symbols;
