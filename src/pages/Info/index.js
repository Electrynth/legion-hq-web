import React from 'react';
import { Typography } from '@material-ui/core';

function Info() {
  return (
    <div
      style={{
        height: 'calc(100vh - 60px)',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Typography>
          Questions, comments, or concerns can be sent to {' '}
          <a
            href="mailto:contact@legion-hq.com"
            style={{ textDecoration: 'none', color: 'lightblue' }}
          >
            contact@legion-hq.com
          </a>
          .
        </Typography>
        <Typography>
          All game images, character names, and game pieces are © FFG & © Disney.
        </Typography>
        <div style={{ height: 150 }} />
        <Typography>
          Want to Donate?
        </Typography>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Cookie"
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="bmc-button"
          href="https://www.buymeacoffee.com/TY5SLhK"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            alt="Buy me a coffee"
          />
          <span
            style={{ marginLeft: '5px', fontSize: '28px !important' }}
          >
            Buy me a coffee
          </span>
        </a>
      </div>
    </div>
  );
};

export default Info;
