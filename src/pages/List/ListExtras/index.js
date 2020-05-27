import React from 'react';
import {
  Clear as ClearIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  CallSplit as ForkIcon
} from '@material-ui/icons';
import ListContext from 'context/ListContext';
import LinkButton from './LinkButton';
import QRButton from './QRButton';
import ImageExportButton from './ImageExportButton';
import TextExportButton from './TextExportButton';
import PrintExportButton from './PrintExportButton';
import SimpleButton from './SimpleButton';

function ListExtras() {
  const {
    currentList,
    handleClearList
  } = React.useContext(ListContext);
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center'
      }}
    >
      <LinkButton currentList={currentList} />
      <QRButton currentList={currentList} />
      <ImageExportButton currentList={currentList} />
      <TextExportButton currentList={currentList} />
      <PrintExportButton currentList={currentList} />
      <SimpleButton
        isDisabled={true}
        icon={<SaveIcon />}
        label="Save List"
        handleClick={() => console.log('saved')}
      />
      <SimpleButton
        isDisabled={true}
        icon={<ForkIcon />}
        label="Fork List"
        handleClick={() => console.log('forked')}
      />
      <SimpleButton
        icon={<ClearIcon />}
        label="Clear List"
        handleClick={handleClearList}
      />
      <SimpleButton
        isDisabled={true}
        icon={<DeleteIcon />}
        label="Delete List"
        handleClick={() => console.log('deleted')}
      />
    </div>
  );
};

export default ListExtras;
