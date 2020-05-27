import React from 'react';
import { Chip } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';
import ListContext from 'context/ListContext';
import cards from 'constants/cards';

const chipSize = 'medium';

function ListObjectives() {
  const {
    currentList,
    setCardPaneFilter,
    handleRemoveBattle
  } = React.useContext(ListContext);
  const chipStyle = { marginRight: 4, marginBottom: 4 };
  const objectiveTheme = createMuiTheme({
    palette: { primary: { main: '#274c82' } }
  });
  const deploymentTheme = createMuiTheme({
    palette: { primary: { main: '#38643A' } }
  });
  const conditionTheme = createMuiTheme({
    palette: { primary: { main: '#963233' } }
  });
  const objectives = currentList.objectiveCards.map((id, i) => (
    <Chip
      color="primary"
      key={id}
      label={cards[id].cardName}
      style={chipStyle}
      onDelete={() => handleRemoveBattle('objective', i)}
    />
  ));
  const deployments = currentList.deploymentCards.map((id, i) => (
    <Chip
      color="primary"
      key={id}
      label={cards[id].cardName}
      style={chipStyle}
      onDelete={() => handleRemoveBattle('deployment', i)}
    />
  ));
  const conditions = currentList.conditionCards.map((id, i) => (
    <Chip
      color="primary"
      key={id}
      label={cards[id].cardName}
      style={chipStyle}
      onDelete={() => handleRemoveBattle('condition', i)}
    />
  ));
  return (
    <div
      id="list-objectives"
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center'
      }}
    >
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
        <ThemeProvider theme={objectiveTheme}>
          {objectives.length < 4 && <Chip
            clickable
            size={chipSize}
            color="primary"
            label="Objective"
            icon={<AddIcon />}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => setCardPaneFilter({
              action: 'BATTLE', type: 'objective'
            })}
          />}
          {objectives}
        </ThemeProvider>
      </div>
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
        <ThemeProvider theme={conditionTheme}>
          {deployments.length < 4 && <Chip
            clickable
            size={chipSize}
            color="primary"
            label="Deployment"
            icon={<AddIcon />}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => setCardPaneFilter({
              action: 'BATTLE', type: 'deployment'
            })}
          />}
          {deployments}
        </ThemeProvider>
      </div>
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
        <ThemeProvider theme={deploymentTheme}>
          {conditions.length < 4 && <Chip
            clickable
            size={chipSize}
            color="primary"
            label="Condition"
            icon={<AddIcon />}
            style={{ marginBottom: 4, marginRight: 4 }}
            onClick={() => setCardPaneFilter({
              action: 'BATTLE', type: 'condition'
            })}
          />}
          {conditions}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ListObjectives;
