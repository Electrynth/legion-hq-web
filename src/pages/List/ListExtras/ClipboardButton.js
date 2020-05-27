import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

function ClipboardButton({ content }) {
  const [copySuccess, setCopySuccess] = useState(false);
  return (
    <Button
      disabled={copySuccess}
      onClick={() => {
        navigator.clipboard.writeText(content);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 1000); // 1 second cooldown
      }}
    >
      {copySuccess ? 'Copied!' : 'Copy to clipboard'}
    </Button>
  );
};

export default ClipboardButton;
