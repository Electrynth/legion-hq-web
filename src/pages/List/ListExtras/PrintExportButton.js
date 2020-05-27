import React from 'react';
import { Chip } from '@material-ui/core';
import { Print as PrintIcon } from '@material-ui/icons';

function PrintExportButton({ currentList }) {
  return (
    <Chip
      clickable
      variant="outlined"
      label="Print List"
      icon={<PrintIcon />}
      style={{ marginRight: 4, marginBottom: 4 }}
    />
  );
};

export default PrintExportButton;
