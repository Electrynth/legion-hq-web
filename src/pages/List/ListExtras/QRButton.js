import React from 'react';
import QRCode from 'qrcode.react';
import { Chip } from '@material-ui/core';
import { CropFree as QRCodeIcon } from '@material-ui/icons';
import generateLink from './generateLink';
import DialogModal from './DialogModal';

function QRButton({ currentList }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const listLink = generateLink(currentList);
  return (
    <div style={{ marginRight: 4, marginBottom: 4 }}>
      <Chip
        clickable
        variant="outlined"
        label="Show QR Code"
        icon={<QRCodeIcon />}
        onClick={() => setIsOpen(true)}
      />
      <DialogModal
        isOpen={isOpen}
        title="QR Code"
        content={<QRCode size={196} value={listLink} />}
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default QRButton;
