import React from 'react';
import { Chip, TextField } from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';
import ClipboardButton from './ClipboardButton';
import DialogModal from './DialogModal';
import generateLink from './generateLink';

function LinkButton({ currentList }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const listLink = generateLink(currentList);
  return (
    <div style={{ marginRight: 4, marginBottom: 4 }}>
      <Chip
        clickable
        variant="outlined"
        label="Legion HQ Link"
        icon={<LinkIcon />}
        onClick={() => setIsOpen(true)}
      />
      <DialogModal
        isOpen={isOpen}
        title="Legion HQ Link"
        content={<TextField value={listLink} />}
        actions={<ClipboardButton content={listLink} />}
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default LinkButton;
