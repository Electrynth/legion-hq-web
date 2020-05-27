import React from 'react';
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';

function ToggleButton({ label, value, handleChange }) {
  return (
    <FormGroup>
      <FormControlLabel
        label={label}
        labelPlacement="start"
        control={
          <Checkbox
            color="primary"
            checked={value}
            onChange={handleChange}
            style={{ marginLeft: 8 }}
          />
        }
    />
    </FormGroup>
  );
};

export default ToggleButton;
