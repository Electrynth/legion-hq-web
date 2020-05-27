import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

function TitleField({ activations, title, handleChange }) {
  return (
    <TextField
      value={title}
      helperText={`${activations} ${activations === 1 ? 'activation' : 'activations'}`}
      onChange={handleChange}
    />
  );
};

TitleField.propTypes = {
  activations: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default TitleField;
