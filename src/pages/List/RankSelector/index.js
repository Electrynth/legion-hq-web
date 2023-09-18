import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListContext from 'context/ListContext';
import ranks from 'constants/ranks';
// import legionModes from 'constants/legionModes';
// import cards from 'constants/cards';
import RankButton from './RankButton';
// import battleForcesDict from 'constants/battleForcesDict';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  item: { marginRight: 10 }
});

function RankSelector() {
  const classes = useStyles();
  const { currentList, setCardPaneFilter, rankLimits } = useContext(ListContext);
  let rankInteractions = 0;
  if (currentList.rankInteractions) {
    Object.keys(currentList.rankInteractions).forEach(key => {
      rankInteractions += currentList.rankInteractions[key];
    });
  }

  const currentUnitCounts = { ...currentList.unitCounts };



  // Object.keys(ranks).forEach(key => {
  //   let count = currentUnitCounts[key];
  //   const mode = legionModes[currentList.mode];
  //   let leftBoundary = mode.unitCounts[key][0];
  //   let rightBoundary = mode.unitCounts[key][1];


  //   if (currentList.battleForce) {
  //     if (!battleForcesDict[currentList.battleForce][currentList.mode]) {
  //       leftBoundary = battleForcesDict[currentList.battleForce]['standard mode'][key][0];
  //       rightBoundary = battleForcesDict[currentList.battleForce]['standard mode'][key][1];
  //     } else {
  //       leftBoundary = battleForcesDict[currentList.battleForce][currentList.mode][key][0];
  //       rightBoundary = battleForcesDict[currentList.battleForce][currentList.mode][key][1];
  //     }

  //     if (key === 'commander' && currentList.hasFieldCommander) {
  //       leftBoundary = 0;
  //     }
  //     if (key === 'special') rightBoundary += rankInteractions;
  //     if (count >= leftBoundary && count <= rightBoundary) {
  //       rankValidities[key] = true;
  //     }
  //     if (currentList.battleForce === 'Shadow Collective') {

  //       if (currentList.mode === '500-point mode' && (key === 'commander' || key === 'operative')) {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 2) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       } else {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 4) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       }
  //     } else if (currentList.battleForce === 'Blizzard Force') {
  //       if (currentList.mode === '500-point mode' && (key === 'commander' || key === 'operative')) {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 2) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       } else {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 2) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       }
  //       if (key === 'corps') {
  //         const maxStormtroopers = 2;
  //         let currentStormtroopers = 0;
  //         for (let i = 0; i < currentList.units.length; i++) {
  //           if (currentList.units[i].unitId === 'ay') {
  //             currentStormtroopers += currentList.units[i].count;
  //           }
  //         }
  //         if (currentStormtroopers > maxStormtroopers) rankValidities.corps = false;
  //       }
  //     } else if (currentList.battleForce === 'Echo Base Defenders') {
  //       if (currentList.mode === '500-point mode' && (key === 'commander' || key === 'operative')) {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 3) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       } else {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 4) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       }
  //     } else if (currentList.battleForce === '501st Legion') {
  //       if (key === 'commander' || key === 'operative') {
  //         if (currentUnitCounts.commander + currentUnitCounts.operative > 2) {
  //           rankValidities.commander = false;
  //           rankValidities.operative = false;
  //         }
  //       }
  //     }

  //   } else {
  //     if (key === 'commander' && currentList.hasFieldCommander) {
  //       leftBoundary = 0;
  //     }
  //     if (key === 'special') rightBoundary += rankInteractions;
  //     if (count >= leftBoundary && count <= rightBoundary) {
  //       rankValidities[key] = true;
  //     }
  //   }
  // });

  return (
    <div className={classes.container}>
      {Object.keys(rankLimits).map(key => {

        if(!key[0]) // commOp is a non-array, non-displayed rank limit
          return null;

        let color = 'primary';
        if(currentUnitCounts[key] > rankLimits[key][1] || currentUnitCounts[key] < rankLimits[key][0]){
          color = 'error'
        }

        return (
          <div key={ranks[key].name} className={classes.item}>
            <RankButton
              rank={key}
              color={color}
              count={currentUnitCounts[key]}
              handleClick={() => setCardPaneFilter({
                action: 'UNIT', rank: key
              })}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RankSelector;
