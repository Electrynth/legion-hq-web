import React from 'react';
import Chip from '@material-ui/core/Chip';

function SimpleButton({
  timeout, timeoutMessage = 'Processing...', isDisabled, icon, label, handleClick
}) {
  const [isTimedout, setIsTimedout] = React.useState(false);
  const onClick = timeout ? () => {
    handleClick();
    setIsTimedout(true);
    setTimeout(() => setIsTimedout(false), timeout);
  } : handleClick;
  return (
    <Chip
      clickable
      disabled={isDisabled ? isDisabled : isTimedout}
      variant="outlined"
      icon={icon}
      label={isTimedout ? timeoutMessage : label}
      onClick={onClick}
      style={{ marginRight: 4, marginBottom: 4 }}
    />
  );
};

export default SimpleButton;
