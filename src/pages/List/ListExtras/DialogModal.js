import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';

function DialogModal({
  isOpen, isMobile, title, content, actions, handleClose
}) {
  const dialogStyle = title ? {} : { padding: 0 };
  return (
    <Dialog fullScreen={isMobile} open={isOpen} onClose={handleClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent style={dialogStyle}>
        {content}
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;
