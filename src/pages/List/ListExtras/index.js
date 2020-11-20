import React, { useState, useContext } from 'react';
import {
  History as UsePrevIcon,
  Clear as ClearIcon,
  Save as SaveIcon,
  CallSplit as ForkIcon
} from '@material-ui/icons';
import cards from 'constants/cards';
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
  const [usingOldPoints, setUsingOldPoints] = useState(false);
  const { userId } = useContext(DataContext);
  const {
    currentList,
    listSaveMessage,
    handleClearList,
    handleListSave,
    handleListFork
  } = useContext(ListContext);

  const toggleUsingOldPoints = () => {
    handleClearList();
    Object.keys(cards).forEach(id => {
      const card = cards[id];
      if (card.prevCost) {
        const temp = card.cost;
        card.cost = card.prevCost;
        card.prevCost = temp;
      }
    });
    setUsingOldPoints(!usingOldPoints);
  }

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
        isDisabled={usingOldPoints || !Boolean(userId)}
        icon={<SaveIcon />}
        label="Save List"
        handleClick={() => handleListSave(currentList)}
      />
      <SimpleButton
        isDisabled={usingOldPoints || !Boolean(currentList.listId)}
        icon={<ForkIcon />}
        label="Fork List"
        handleClick={() => handleListFork(currentList)}
      />
      <SimpleButton
        icon={<ClearIcon />}
        label="Clear List"
        handleClick={handleClearList}
      />
      <SimpleButton
        timeout={1000}
        timeoutMessage="Resetting list..."
        icon={<UsePrevIcon />}
        label={usingOldPoints ? "Using Sep 2019 Points" : "Using Nov 2020 Points"}
        handleClick={toggleUsingOldPoints}
      />
    </div>
  );
};

export default ListExtras;
