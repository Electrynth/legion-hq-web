import React, { useContext } from 'react';
import {
  Clear as ClearIcon,
  Save as SaveIcon,
  CallSplit as ForkIcon
} from '@material-ui/icons';
import DataContext from 'context/DataContext';
import ListContext from 'context/ListContext';
import TemplateButton from './TemplateButton';
import LinkButton from './LinkButton';
import QRButton from './QRButton';
import ImageExportButton from './ImageExportButton';
import TextExportButton from './TextExportButton';
import PrintExportButton from './PrintExportButton';
import SimpleButton from './SimpleButton';

function ListExtras() {
  const { userId } = useContext(DataContext);
  const {
    currentList,
    listSaveMessage,
    handleClearList,
    handleListSave,
    handleListFork
  } = useContext(ListContext);
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center'
      }}
    >
      <TemplateButton />
      <LinkButton currentList={currentList} />
      <QRButton currentList={currentList} />
      <ImageExportButton currentList={currentList} />
      <TextExportButton currentList={currentList} />
      <PrintExportButton currentList={currentList} />
      <SimpleButton
        timeout={3000}
        timeoutMessage={listSaveMessage ? listSaveMessage : 'Saving...'}
        isDisabled={!Boolean(userId)}
        icon={<SaveIcon />}
        label="Save List"
        handleClick={() => handleListSave(currentList)}
      />
      <SimpleButton
        isDisabled={!Boolean(currentList.listId)}
        icon={<ForkIcon />}
        label="Fork List"
        handleClick={() => handleListFork(currentList)}
      />
      <SimpleButton
        icon={<ClearIcon />}
        label="Clear List"
        handleClick={handleClearList}
      />
    </div>
  );
};

export default ListExtras;
