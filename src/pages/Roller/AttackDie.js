import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { geometry, attackDice } from 'constants/dice.js';
import './spin.css';

const sqrt3 = 1.732;
const tilt = 35.27; // atan(1/sqrt(2))
const triWidth = 20;
const triHeight = (triWidth * sqrt3) - 0.5;

const useStyles = makeStyles(theme => ({
  margin: {
    marginRight: 12,
    marginTop: 12
  },
  solid: {
    left: 0,
    bottom: '50%',
    width: `${triWidth * 2}px`,
    height: `${triWidth * 2}px`,
    transformStyle: 'preserve-3d'
  },
  spinning: {
    animation: 'spinning 1s infinite linear'
  },
  side: {
    position: 'absolute',
    left: 0,
    bottom: '50%',
    width: `${triWidth * 2}px`,
    height: `${triHeight}px`,
    transformOrigin: '50% 100%'
  }
}));

function AttackDie({ color, faceIndex = 0, isRolling = false }) {
  const classes = useStyles();
  if (!attackDice[color]) return null;
  const { d8 } = geometry;
  const orientation = faceIndex < 8 ? 0 : 1;
  const [x, y] = d8[faceIndex % 8][orientation];
  const rotationStyles = {
    transition: '100ms linear all',
    transform: `rotateX(${x}deg) rotateY(${y}deg)`
  };
  // setTimeout(() => { setIsSpinning(false); }, 1000 + (25 * getRandomInt(10)));
  return (
    <div className={classes.margin}>
      <div
        className={clsx(classes.solid, { [classes.spinning]: isRolling })}
        style={isRolling ? {} : rotationStyles}
      >
        {attackDice[color].faces.map(face => {
          const newTilt = face.index > 4 ? 180 - tilt : tilt;
          const mirror = face.index > 4;
          const rotateY = `rotateY(${face.index * 90}deg)`;
          const translateZ = `translateZ(${triWidth}px)`;
          const rotateX = `rotateX(${newTilt}deg)`;
          const styles = {
            transform: `${rotateY} ${translateZ} ${rotateX}`
          };
          return (
            <div
              key={face.index}
              className={classes.side}
              style={styles}
            >
              <img
                alt={face.index}
                src={face.src}
                style={mirror ? { transform: 'scaleX(-1)' } : {}}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttackDie;
