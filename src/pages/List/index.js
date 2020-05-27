import React from 'react';
import { withWidth } from '@material-ui/core';
import { ListProvider } from 'context/ListContext';
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from 'common/ErrorFallback';
import ListLayout from './ListLayout';

function List({ width, slug, listHash, storedLists, updateStoredList }) {
  return (
    <ListProvider
      width={width}
      slug={slug}
      listHash={listHash}
      storedLists={storedLists}
      updateStoredList={updateStoredList}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ListLayout />
      </ErrorBoundary>
    </ListProvider>
  );
}

export default withWidth()(List);
