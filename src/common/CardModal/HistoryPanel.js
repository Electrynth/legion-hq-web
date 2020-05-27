import React from 'react';
import {
  Divider,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

function HistoryPanel({ history }) {
  if (!(history instanceof Array)) return null;
  const columnContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 24px 24px'
  };
  return (
    <React.Fragment>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>History</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={columnContainerStyles}>
          {history.map(entry => (
            <div key={entry.description}>
              <Typography variant="caption" color="textSecondary">
                {entry.date}
              </Typography>
              <div style={{ flexGrow: 1 }} />
              <Typography variant="body2">
                {entry.description}
              </Typography>
              <Divider />
            </div>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default HistoryPanel;
