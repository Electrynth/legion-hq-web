import React, { useState, useEffect } from 'react';
import {
  Chip,
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField
} from '@material-ui/core';
import { Description as TextIcon } from '@material-ui/icons';
import {
  generateStandardText,
  generateTournamentText
} from 'constants/listOperations';
import DialogModal from './DialogModal';
import ClipboardButton from './ClipboardButton';

function generateListText(type, currentList) {
  if (type === 0) return generateStandardText(currentList);
  else if (type === 1) return generateTournamentText(currentList);
  else return '';
}

function TabPanel({ value, index, children }) {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function DialogContent({
  currentList, tabValue, content, handleChangeTextType, handleChangeListText
}) {
  return (
    <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
      <AppBar position="static" color="secondary">
        <Tabs
          variant="scrollable"
          indicatorColor="primary"
          value={tabValue}
          onChange={handleChangeTextType}
        >
          <Tab label="Standard" />
          <Tab label="Tournament" />
        </Tabs>
      </AppBar>
      <TabPanel value="standard" index={0}>
        Standard
      </TabPanel>
      <TabPanel value="tournament" index={1}>
        Tournament
      </TabPanel>
      <div style={{ marginTop: 16 }} />
      {content && (
        <TextField
          multiline
          size="small"
          variant="outlined"
          value={content}
          onChange={handleChangeListText}
          style={{ padding: 8, width: '100%' }}
        />
      )}
    </div>
  );
}

function TextExportButton({ currentList }) {
  const [isOpen, setIsOpen] = useState(false);
  const [textType, setTextType] = useState(0);
  const [listText, setListText] = useState('');
  const handleChangeTextType = (e, value) => setTextType(value);
  const handleChangeListText = e => setListText(e.target.value);
  useEffect(() => {
    setListText(generateListText(textType, currentList));
  }, [currentList, isOpen, textType]);
  return (
    <div style={{ marginRight: 4, marginBottom: 4 }}>
      <Chip
        clickable
        variant="outlined"
        label="Export Text"
        icon={<TextIcon />}
        onClick={() => setIsOpen(true)}
      />
      <DialogModal
        isOpen={isOpen}
        actions={<ClipboardButton content={listText} />}
        content={
          <DialogContent
            currentList={currentList}
            tabValue={textType}
            content={listText}
            handleChangeTextType={handleChangeTextType}
            handleChangeListText={handleChangeListText}
          />
        }
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default TextExportButton;