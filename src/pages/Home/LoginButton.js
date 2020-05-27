import React from 'react';
import { Button } from '@material-ui/core';
import LargerTooltip from 'common/LargerTooltip';

function LoginButton({ auth }) {
  let disabled, buttonText, tooltipText, handleClick;
  if (!auth) {
    disabled = true;
    tooltipText = '';
    buttonText = 'Loading...';
  } else if (auth.isAuthenticated()) {
    disabled = false;
    buttonText = 'Logout';
    tooltipText = `Logged in as ${auth.getEmail()}`;
    handleClick = auth.signOut;
  } else {
    disabled = false;
    buttonText = 'Login';
    tooltipText = 'Login via Google, Facebook, or use a custom account.';
    handleClick = auth.signIn;
  }
  return (
    <LargerTooltip arrow title={tooltipText}>
      <Button
        color="default"
        variant="contained"
        disabled={disabled}
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    </LargerTooltip>
  );
};

export default LoginButton;
