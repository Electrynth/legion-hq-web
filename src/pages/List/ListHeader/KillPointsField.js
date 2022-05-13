import React from 'react';
import PropTypes from 'prop-types';
import {Chip} from '@material-ui/core';

function KillPointField({killPoints, handleChange}) {
    return (
        <Chip
            label={`Kill points: ${killPoints}`}
            onChange={handleChange}
        />
    );
};

KillPointField.propTypes = {
    killPoints: PropTypes.number.isRequired,
};

export default KillPointField;
