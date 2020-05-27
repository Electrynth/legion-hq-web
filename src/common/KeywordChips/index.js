import React from 'react';
import Typography from '@material-ui/core/Typography';
import KeywordChip from './KeywordChip';

function KeywordChips({ keywords, size = 'medium' }) {
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  };
  return (
    <div style={containerStyle}>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ marginRight: 4 }}
      >
        Keywords
      </Typography>
      <div style={{ flexGrow: 1 }} />
      {keywords.map(keyword => (
        <div key={keyword} style={{ marginRight: 2, marginBottom: 2 }}>
          <KeywordChip keyword={keyword} size={size} />
        </div>
      ))}
    </div>
  );
}

export default KeywordChips;
