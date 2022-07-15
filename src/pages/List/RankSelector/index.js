import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListContext from 'context/ListContext';
import ranks from 'constants/ranks';
import legionModes from 'constants/legionModes';
import cards from 'constants/cards';
import RankButton from './RankButton';
import battleForcesDict from 'constants/battleForcesDict';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  item: { marginRight: 10 }
});

function RankSelector() {
  const classes = useStyles();
  const { currentList, setCardPaneFilter } = useContext(ListContext);
  let rankInteractions = 0;
  if (currentList.rankInteractions) {
    Object.keys(currentList.rankInteractions).forEach(key => {
      rankInteractions += currentList.rankInteractions[key];
    });
  }

  const currentUnitCounts = { ...currentList.unitCounts };

  if (currentList.uniques.includes('rc') && currentList.uniques.includes('rq')) { // Maul + Darksaber interaction
    currentUnitCounts['commander'] += 1;
    currentUnitCounts['operative'] -= 1;
  }

  return (
    <div className={classes.container}>
      {Object.keys(ranks).map(key => {
        let color = 'error';
        let count = currentUnitCounts[key];
        const mode = legionModes[currentList.mode];
        let leftBoundary = mode.unitCounts[key][0];
        let rightBoundary = mode.unitCounts[key][1];


        if (currentList.battleForce) {
          leftBoundary = battleForcesDict[currentList.battleForce][currentList.mode][key][0];
          rightBoundary = battleForcesDict[currentList.battleForce][currentList.mode][key][1];
          if (key === 'special') rightBoundary += rankInteractions;
          if (count >= leftBoundary && count <= rightBoundary) {
            color = 'primary';
          }
        } else {
          if (key === 'special') rightBoundary += rankInteractions;
          if (count >= leftBoundary && count <= rightBoundary) {
            color = 'primary';
          } else if (key === 'commander' && currentList.hasFieldCommander) {
            color = 'primary';
          }
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
