import React, { useState } from 'react';
import {
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';

export default function HelpChip({ size }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <React.Fragment>
      <Dialog onClose={handleClose} open={isOpen}>
        <DialogTitle>Storm Tide</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Storm Tide is an unofficial Legion narrative campaign for 2 players that spans multiple episodes and will be played with monthly boxes that provide the content to continue the narrative. By using Legion as the core rule set, Storm Tide allows players to use their Legion products in new and interesting ways. Find out more <a target="_blank" rel="noopener noreferrer" href="https://stormtide.thefifthtrooper.com/">here</a>.
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Chip
        clickable
        size={size}
        label={<Typography variant="body2">What is this?</Typography>}
        onClick={handleOpen}
        style={{ marginBottom: 4, marginRight: 4 }}
      />
    </React.Fragment>
  );
};
