import React from 'react';
import PropTypes from 'prop-types';
import { Badge, IconButton, Avatar } from '@material-ui/core';
import LargerTooltip from 'common/LargerTooltip';
import ranks from 'constants/ranks';

function RankButton({ rank, color, count, handleClick }) {
  return (
    <LargerTooltip title={ranks[rank].title}>
      <IconButton size="small" onClick={handleClick}>
        <Badge
          showZero
          max={100}
          color={color}
          badgeContent={count}
        >
          <Avatar
            alt={rank}
            src={ranks[rank].icon}
            style={{ width: 32, height: 32 }}
          />
        </Badge>
      </IconButton>
    </LargerTooltip>
  );
};

RankButton.propTypes = {
  count: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  rank: PropTypes.oneOf(Object.keys(ranks)).isRequired,
  handleClick: PropTypes.func.isRequired
};

export default RankButton;
