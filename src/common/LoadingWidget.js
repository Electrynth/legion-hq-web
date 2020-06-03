import React from 'react';
import Fade from '@material-ui/core/Fade';
import LoadingIcon from 'assets/LoadingIcon.png';

function LoadingWidget() {
  return (
    <Fade in>
      <div
        style={{
          top: '44%',
          left: '50%',
          position: 'absolute',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <img alt="Loading..." className="pulse" src={LoadingIcon} />
      </div>
    </Fade>
  );
};

export default LoadingWidget;
