import React from 'react';
import { Paper, IconButton } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';

function SelectorHeader({ headerContent, cardPaneFilter, setCardPaneFilter }) {
  const sticky = {
    top: 0,
    zIndex: 1,
    marginBottom: 4,
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    justifyContent: 'space-between',
    position: '-webkit-sticky',
    position: 'sticky'
  };
  return (
    <Paper style={sticky}>
      {headerContent}
      <div style={{ flexGrow: 1 }} />
      <IconButton onClick={() => setCardPaneFilter({ action: 'DISPLAY' })}>
        <ClearIcon />
      </IconButton>
    </Paper>
  );
}

export default SelectorHeader;
