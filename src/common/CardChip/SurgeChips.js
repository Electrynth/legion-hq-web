import React, { useContext } from 'react';
import Img from 'react-image';
import { Chip } from '@material-ui/core';
import DataContext from 'context/DataContext';
import symbols from 'constants/symbols';

function SurgeLabel({ type }) {
  const { userSettings } = useContext(DataContext);
  const themeType = userSettings.themeColor === 'light' ? 'dark' : 'light';
  return (
    <Img
      alt={`${type} surge`}
      src={symbols.surge[type][themeType]}
      style={{ width: 50, marginTop: 5 }}
    />
  );
}

function SurgeChips({ size, surges }) {
  if (!surges) return (
    <Chip
      size={size}
      label="Error (surges)"
      style={{ marginRight: 4, marginBottom: 4 }}
    />
  );
  const chips = surges.map(surge => (
    <Chip
      key={surge}
      size={size}
      label={<SurgeLabel type={surge} />}
      style={{ marginRight: 4, marginBottom: 4 }}
    />
  ));
  return (
    <React.Fragment>
      {chips}
    </React.Fragment>
  );
};

export default SurgeChips;
