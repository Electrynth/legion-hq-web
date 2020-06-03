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
import face1 from 'assets/dice/face1.svg';
import face2 from 'assets/dice/face2.svg';
import face3 from 'assets/dice/face3.svg';
import face4 from 'assets/dice/face4.svg';
import face5 from 'assets/dice/face5.svg';
import face6 from 'assets/dice/face6.svg';
import face7 from 'assets/dice/face7.svg';
import face8 from 'assets/dice/face8.svg';

const attackDice = {
  red: {
    faces: [
      { index: 1, label: 'hit', src: redHit },
      { index: 2, label: 'hit', src: redHit },
      { index: 3, label: 'hit', src: redHit },
      { index: 4, label: 'hit', src: redHit },
      { index: 5, label: 'hit', src: redHit },
      { index: 6, label: 'blank', src: redBlank },
      { index: 7, label: 'crit', src: redCrit },
      { index: 8, label: 'surge', src: redAttackSurge }
    ]
  },
  black: {
    faces: [
      { index: 1, label: 'hit', src: blackHit },
      { index: 2, label: 'hit', src: blackHit },
      { index: 3, label: 'hit', src: blackHit },
      { index: 4, label: 'blank', src: blackBlank },
      { index: 5, label: 'blank', src: blackBlank },
      { index: 6, label: 'crit', src: blackCrit },
      { index: 7, label: 'surge', src: blackAttackSurge },
      { index: 8, label: 'blank', src: blackBlank }
    ]
  },
  white: {
    faces: [
      { index: 1, label: 'hit', src: whiteHit },
      { index: 2, label: 'blank', src: whiteBlank },
      { index: 3, label: 'blank', src: whiteBlank },
      { index: 4, label: 'crit', src: whiteCrit },
      { index: 5, label: 'blank', src: whiteBlank },
      { index: 6, label: 'surge', src: whiteAttackSurge },
      { index: 7, label: 'blank', src: whiteBlank },
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

const dummyFaces = [
  { index: 1, src: face1 },
  { index: 2, src: face2 },
  { index: 3, src: face3 },
  { index: 4, src: face4 },
  { index: 5, src: face5 },
  { index: 6, src: face6 },
  { index: 7, src: face7 },
  { index: 8, src: face8 }
];

const geometry = {
  d8: [
    [[325, 270], [215, 90]],
    [[325, 180], [215, 0]],
    [[325, 90], [215, 270]],
    [[325, 0], [215, 180]],
    [[145, 270], [35, 270]],
    [[145, 180], [35, 180]],
    [[145, 90], [35, 90]],
    [[145, 0], [35, 0]]
  ]
};

export {
  attackDice, defenseDice, geometry, dummyFaces
};
