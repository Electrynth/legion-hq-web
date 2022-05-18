import React from 'react';
import PropTypes from 'prop-types';
import {Chip} from '@material-ui/core';

function KillPointField({killPoints}) {
    return (
        <Chip
            label={`Killed points: ${killPoints}`}
        />
    );
};

KillPointField.propTypes = {
    killPoints: PropTypes.number.isRequired,
};

export default KillPointField;
