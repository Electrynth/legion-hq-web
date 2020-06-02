import wounds from 'assets/stats/wounds.png';
import resilience from 'assets/stats/resilience.png';
import courage from 'assets/stats/courage.png';
import blockSurgeLight from 'assets/stats/blockSurgeLight.png';
import blockSurgeDark from 'assets/stats/blockSurgeDark.png';
import critSurgeLight from 'assets/stats/critSurgeLight.png';
import critSurgeDark from 'assets/stats/critSurgeDark.png';
import hitSurgeLight from 'assets/stats/hitSurgeLight.png';
import hitSurgeDark from 'assets/stats/hitSurgeDark.png';
import redAttackDie from 'assets/stats/redAttackDie.png';
import blackAttackDie from 'assets/stats/blackAttackDie.png';
import whiteAttackDie from 'assets/stats/whiteAttackDie.png';
import redDefenseDie from 'assets/stats/redDefenseDie.png';
import whiteDefenseDie from 'assets/stats/whiteDefenseDie.png';

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
