import React from 'react';
import Img from 'react-image';
import LargerTooltip from 'common/LargerTooltip';
import upgradeTypes from 'constants/upgradeTypes';

function UpgradeBar({ upgradeBar }) {
  const containerStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  };
  const imageStyles = { height: 24 };
  const upgradeIcons = upgradeBar.map((type, i) => {
    const title = upgradeTypes[type].name;
    const icon = upgradeTypes[type].icon;
    return (
      <div key={`${type}${i}`} style={{ marginRight: 4, marginBottom: 4 }}>
        <LargerTooltip title={title}>
          <Img alt={title} src={icon} style={imageStyles} />
        </LargerTooltip>
      </div>
    );
  })
  return (
    <div style={containerStyles}>
      {upgradeIcons}
    </div>
  );
};

export default UpgradeBar;
