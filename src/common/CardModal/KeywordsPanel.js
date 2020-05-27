import React from 'react';
import {
  Divider,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import keywords from 'constants/keywords';

function KeywordsPanel({ cardKeywords }) {
  if (!(cardKeywords instanceof Array)) return null;
  else if (cardKeywords.length === 0) return null;
  const columnContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 24px 24px'
  };
  return (
    <React.Fragment>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Keywords</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={columnContainerStyles}>
          {cardKeywords.map(keyword => (
            <div key={keyword}>
              <Typography variant="caption" color="textSecondary">
                {keyword}
              </Typography>
              <div style={{ flexGrow: 1 }} />
              <Typography variant="body2">
                {keyword in keywords ? keywords[keyword] : 'No definition found.'}
              </Typography>
              <Divider />
            </div>
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default KeywordsPanel;
