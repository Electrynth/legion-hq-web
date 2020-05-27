import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListContext from 'context/ListContext';
import ranks from 'constants/ranks';
import legionModes from 'constants/legionModes';
import RankButton from './RankButton';

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
  return (
    <div className={classes.container}>
      {Object.keys(ranks).map(key => {
        let color = 'error';
        const count = currentList.unitCounts[key];
        const mode = legionModes[currentList.mode];
        let leftBoundary = mode.unitCounts[key][0];
        let rightBoundary = mode.unitCounts[key][1];
        if (key === 'special') rightBoundary += rankInteractions;
        if (count >= leftBoundary && count <= rightBoundary) {
          color = 'primary';
        }
        return (
          <div key={ranks[key].name} className={classes.item}>
            <RankButton
              rank={key}
              color={color}
              count={currentList.unitCounts[key]}
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
