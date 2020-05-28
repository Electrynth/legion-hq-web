import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import DataContext from 'context/DataContext';
import ListContext from 'context/ListContext';

function ListId() {
  const { userId } = useContext(DataContext)
  const { currentList } = useContext(ListContext);
  if (!currentList) return null;
  return (
    <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems:' center' }}>
      {userId && (
        <Typography variant="caption" color="textSecondary">
          User ID: {userId}
        </Typography>
      )}
      {currentList.listId && (
        <Typography variant="caption" color="textSecondary">
          List ID: {currentList.listId}
        </Typography>
      )}
    </div>
  );
};

export default ListId;
