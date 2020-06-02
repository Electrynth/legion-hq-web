import React from 'react';
import { makeStyles } from '@material-ui/core';
import { attackDice as colors } from 'constants/dice.js';

const sqrt3 = 1.732;
const tilt = 35.27; // atan(1/sqrt(2))
const triWidth = 25;
const triHeight = (triWidth * sqrt3) - 0.5;

const useStyles = makeStyles(theme => ({
  solid: {
    left: 0,
    bottom: '50%',
    width: `${triWidth * 2}px`,
    height: `${triWidth * 2}px`,
    animation: 'spin 16s infinite linear',
    transformStyle: 'preserve-3d'
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

function AttackDie({ color }) {
  const classes = useStyles();
  if (!colors[color]) return null;
  return (
    <div className={classes.innerContainer}>
      <div className={classes.solid}>
        {colors[color].faces.map(face => {
          const newTilt = face.index > 4 ? 180 - tilt : tilt;
          const rotateY = `rotateY(${face.index * 90}deg)`;
          const translateZ = `translateZ(${triWidth}px)`;
          const rotateX = `rotateX(${newTilt}deg)`;
          const styles = {
            transform: `${rotateY} ${translateZ} ${rotateX}`
          };
          return (
            <div key={face.index} className={classes.side} style={styles}>
              <img alt={face.label} src={face.src} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttackDie;
