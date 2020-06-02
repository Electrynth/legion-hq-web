import React from 'react';
import './spinner.scss';
import redhit from './redhit.png';
function Info() {
  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="solid">
          <div className="side red"></div>
          <div className="side red"></div>
          <div className="side red"></div>
          <div className="side red"></div>
          <div className="side red"></div>
          <div className="side red"></div>
          <div className="side red"></div>
          <div className="side red"></div>
        </div>
        <div className="solid">
          <div className="side black"></div>
          <div className="side black"></div>
          <div className="side black"></div>
          <div className="side black"></div>
          <div className="side black"></div>
          <div className="side black"></div>
          <div className="side black"></div>
          <div className="side black"></div>
        </div>
        <div className="solid">
          <div className="side white"></div>
          <div className="side white"></div>
          <div className="side white"></div>
          <div className="side white"></div>
          <div className="side white"></div>
          <div className="side white"></div>
          <div className="side white"></div>
          <div className="side white"></div>
        </div>
      </div>
    </div>
  );
}

export default Info;
