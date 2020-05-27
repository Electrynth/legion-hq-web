import React, { useContext } from 'react';
import { Grid, Divider } from '@material-ui/core';
import ListContext from 'context/ListContext';
import CardModal from 'common/CardModal';
import ListHeader from './ListHeader';
import RankSelector from './RankSelector';
import ListUnits from './ListUnits';
import ListCommands from './ListCommands';
import ListObjectives from './ListObjectives';
import ListExtras from './ListExtras';
import ListDisplay from './ListDisplay';
import CardSelector from './CardSelector';

function ListLayout() {
  const {
    width,
    leftPaneWidth,
    rightPaneWidth,
    isModalOpen,
    modalContent,
    handleCloseModal
  } = useContext(ListContext);

  const isMobile = width === 'xs' || width === 'sm';

  const paneStyles = {
    padding: 4,
    overflow: 'auto',
    height: `calc(100vh - ${isMobile ? '125px' : '75px'})`
  };

  const builderPane = leftPaneWidth > 0 && (
    <Grid item xs={leftPaneWidth} style={paneStyles}>
      <div id="list-content">
        <ListHeader />
        <div style={{ marginTop: 8 }} />
        <RankSelector />
        <ListUnits />
        <Divider style={{ marginBottom: 4 }} />
        <ListCommands />
        <Divider style={{ marginBottom: 4 }} />
        <ListObjectives />
      </div>
      <Divider style={{ marginBottom: 4 }} />
      <ListExtras />
      <div style={{ marginTop: 24 }} />
    </Grid>
  );

  const cardPane = rightPaneWidth > 0 && (
    <Grid item xs={rightPaneWidth} style={paneStyles}>
      <ListDisplay />
      <CardSelector />
    </Grid>
  );

  const modal = (
    <CardModal
      id={modalContent}
      isOpen={isModalOpen}
      handleClose={handleCloseModal}
    />
  );
  return (
    <Grid container direction="row">
      {modal}
      {builderPane}
      {cardPane}
    </Grid>
  );
};

export default ListLayout;
