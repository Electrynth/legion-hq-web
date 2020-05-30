import React from 'react';
import Img from 'react-image';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import urls from 'constants/urls';

function ImagePanel({ card }) {
  if (!card) return null;
  const { cardType, imageName } = card;
  return (
    <React.Fragment>
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Card Image</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ padding: '0px 24px 24px' }}>
          <Img
            src={`${urls.cdn}/${cardType}Cards/${imageName}`}
            loader={<Skeleton variant="rect" width={315} height={225} />}
            style={{ width: '100%' }}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default ImagePanel;
