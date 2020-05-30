import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';

function DialogModal({
  isOpen, isMobile, isFullWidth = false, title, content, actions, handleClose
}) {
  const dialogStyle = title ? {} : { padding: 0 };
  return (
    <Dialog
      fullWidth={isFullWidth}
      open={isOpen}
      fullScreen={isMobile}
      onClose={handleClose}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent style={dialogStyle}>
        {content}
      </DialogContent>
      <DialogActions>
        {isMobile ? (
          <DialogActions>
            {actions}
            <Button
              size="large"
              onClick={handleClose}
            >
              Go Back
            </Button>
          </DialogActions>
        ) : actions}
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;
