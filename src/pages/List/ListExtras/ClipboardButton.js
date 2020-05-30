import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

function ClipboardButton({ content, variant = 'text' }) {
  const [copySuccess, setCopySuccess] = useState(false);
  return (
    <Button
      variant={variant}
      disabled={copySuccess}
      onClick={() => {
        navigator.clipboard.writeText(content);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 500); // 0.5 second cooldown
      }}
    >
      {copySuccess ? 'Copied to clipboard!' : 'Copy to clipboard'}
    </Button>
  );
};

export default ClipboardButton;
