import redHit from 'assets/dice/redHit.svg';
import redCrit from 'assets/dice/redCrit.svg';
import redAttackSurge from 'assets/dice/redAttackSurge.svg';
import redBlank from 'assets/dice/redBlank.svg';
import blackHit from 'assets/dice/blackHit.svg';
import blackCrit from 'assets/dice/blackCrit.svg';
import blackAttackSurge from 'assets/dice/blackAttackSurge.svg';
import blackBlank from 'assets/dice/blackBlank.svg';
import whiteHit from 'assets/dice/whiteHit.svg';
import whiteCrit from 'assets/dice/whiteCrit.svg';
import whiteAttackSurge from 'assets/dice/whiteAttackSurge.svg';
import whiteBlank from 'assets/dice/whiteBlank.svg';

const attackDice = {
  red: {
    faces: [
      { index: 1, label: 'hit', src: redHit },
      { index: 2, label: 'hit', src: redHit },
      { index: 3, label: 'hit', src: redHit },
      { index: 4, label: 'hit', src: redHit },
      { index: 5, label: 'hit', src: redHit },
      { index: 6, label: 'crit', src: redCrit },
      { index: 7, label: 'surge', src: redAttackSurge },
      { index: 8, label: 'blank', src: redBlank }
    ]
  },
  black: {
    faces: [
      { index: 1, label: 'hit', src: blackHit },
      { index: 2, label: 'hit', src: blackHit },
      { index: 3, label: 'hit', src: blackHit },
      { index: 4, label: 'hit', src: blackHit },
      { index: 5, label: 'hit', src: blackHit },
      { index: 6, label: 'crit', src: blackCrit },
      { index: 7, label: 'surge', src: blackAttackSurge },
      { index: 8, label: 'blank', src: blackBlank }
    ]
  },
  white: {
    faces: [
      { index: 1, label: 'hit', src: whiteHit },
      { index: 2, label: 'hit', src: whiteHit },
      { index: 3, label: 'hit', src: whiteHit },
      { index: 4, label: 'hit', src: whiteHit },
      { index: 5, label: 'hit', src: whiteHit },
      { index: 6, label: 'crit', src: whiteCrit },
      { index: 7, label: 'surge', src: whiteAttackSurge },
      { index: 8, label: 'blank', src: whiteBlank }
    ]
  }
};

const defenseDice = {
  red: {
    faces: [
      { index: 1, face: 'blank', src: redBlank },
      { index: 2, face: 'blank', src: redBlank },
      { index: 3, face: 'block', src: redHit },
      { index: 4, face: 'block', src: redHit },
      { index: 5, face: 'block', src: redHit },
      { index: 6, face: 'surge', src: redAttackSurge },
    ]
  },
  white: {
    faces: [
      { index: 1, face: 'blank', src: whiteBlank },
      { index: 2, face: 'blank', src: whiteBlank },
      { index: 3, face: 'blank', src: whiteBlank },
      { index: 4, face: 'blank', src: whiteBlank },
      { index: 5, face: 'block', src: whiteHit },
      { index: 6, face: 'surge', src: whiteAttackSurge },
    ]
  }
};

export { attackDice, defenseDice };
