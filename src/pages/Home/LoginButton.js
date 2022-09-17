import React  from 'react';
import { Button } from '@material-ui/core';
import LargerTooltip from 'common/LargerTooltip';
import DataContext from 'context/DataContext';

function LoginButton({ auth }) {
  const {
    isLoginDisabled,
    loginTooltipText,
    loginButtonText,
    loginHandler
  } = React.useContext(DataContext);
  return (
    <LargerTooltip arrow title={loginTooltipText}>
      <Button
        color="default"
        variant="contained"
        disabled={isLoginDisabled}
        onClick={loginHandler}
      >
        {loginButtonText}
      </Button>
    </LargerTooltip>
  );
};

export default LoginButton;
