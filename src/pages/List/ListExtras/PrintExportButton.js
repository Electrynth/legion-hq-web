import React from 'react';
import QRCode from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';
import { Chip, Menu, MenuItem } from '@material-ui/core';
import { Print as PrintIcon } from '@material-ui/icons';
import { generateTournamentText } from 'constants/listOperations';
import generateLink from './generateLink';
import cards from 'constants/cards';
import urls from 'constants/urls'

class PrintList extends React.Component {
  render() {
    const { currentList, showBattlesAndCommands = false, showBattlesNoCommands = false } = this.props;
    const listLink = generateLink(currentList);
    const units = []; let printingUnits = true;
    const commands = []; let printingCommands = false;
    const battles = []; let printingBattles = false;
    const lines = generateTournamentText(currentList).split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (printingUnits) units.push(line);
      else if (printingCommands) commands.push(line);
      else if (printingBattles) battles.push(line);
      if (line === '') {
        if (printingUnits) {
          printingUnits = false;
          printingCommands = true;
        } else if (printingCommands) {
          printingCommands = false;
          printingBattles = true;
        }
      }
    }

    const unitLines = [];
    units.forEach((line, i) => {
      if (i === 0) unitLines.push(<div key={`${line}_${i}`} style={{ fontSize: 24 }}>{line}</div>);
      else if (line.includes('- ')) unitLines.push(<div key={`${line}_${i}`}>{line}</div>);
      else unitLines.push(<div key={`${line}_${i}`} style={{ marginTop: 6 }}>{line}</div>)
    })

    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-evenly'
        }}
      >
        <div>{unitLines}</div>
        <div style={{ display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
          {showBattlesAndCommands && (
            <div>
              {commands.map((line, i) => {
                if (line.includes('Commands:')) {
                  return <b key="commands header">Command Hand</b>;
                }
                return <div key={`${line}_${i}`}>{line}</div>;
              })}
              <div style={{ marginTop: 4 }} />
              {battles.map((line, i) => {
                if (line.includes('Battle Deck')) {
                  return <b key="battle deck header">Battle Deck</b>;
                }
                return <div key={`${line}_${i}`}>{line}</div>;
              })}
            </div>
          )}
          {showBattlesNoCommands && (
            <div>
              {battles.map((line, i) => {
                if (line.includes('Battle Deck')) {
                  return <b key="battle deck header">Battle Deck</b>;
                }
                return <div key={`${line}_${i}`}>{line}</div>;
              })}
            </div>
          )}
          <QRCode size={147} value={listLink} />
        </div>
      </div>
    )
  }
}

class PrintListImages extends React.Component {
  render() {
    const { currentList } = this.props;
    const listLink = generateLink(currentList);
    const units = []; let printingUnits = true;
    const commands = []; let printingCommands = false;
    const battles = []; let printingBattles = false;
    
    currentList.units.forEach((unit, i) => {
      const card = cards[unit.unitId];
      const unitImage = `${urls.cdn}/${card.cardType}Cards/${card.imageName}`
      const upgradeImages = [];
      unit.upgradesEquipped.forEach((upgradeId, i) => {
        if (!upgradeId) return;
        const upgradeCard = cards[upgradeId];
        upgradeImages.push(`${urls.cdn}/${upgradeCard.cardType}Cards/${upgradeCard.imageName}`);
      });
      units.push(
        <div id={`${unit}-${i}`}>
          <img
            alt={card.cardName}
            src={unitImage}
            style={{ height: '200px', width: 'auto' }}
          />
        </div>
      );
    });


    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-evenly'
        }}
      >
        <div>{units}</div>
        <div style={{ display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
          {true && (
            <div>
              {commands.map((line, i) => {
                if (line.includes('Commands:')) {
                  return <b key="commands header">Command Hand</b>;
                }
                return <div key={`${line}_${i}`}>{line}</div>;
              })}
              <div style={{ marginTop: 4 }} />
              {battles.map((line, i) => {
                if (line.includes('Battle Deck')) {
                  return <b key="battle deck header">Battle Deck</b>;
                }
                return <div key={`${line}_${i}`}>{line}</div>;
              })}
            </div>
          )}
          {true && (
            <div>
              {battles.map((line, i) => {
                if (line.includes('Battle Deck')) {
                  return <b key="battle deck header">Battle Deck</b>;
                }
                return <div key={`${line}_${i}`}>{line}</div>;
              })}
            </div>
          )}
          <QRCode size={147} value={listLink} />
        </div>
      </div>
    )
  }
}

function PrintExportButton({ currentList }) {
  const componentRef = React.useRef();
  const componentRefNoBattlesCommands = React.useRef();
  const componentRefBattlesButNoCommands = React.useRef();
  const componentRefImages = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePrintMenuOpen = event => setAnchorEl(event.currentTarget);
  const handlePrintMenuClose = () => setAnchorEl(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  const handlePrintNoBattlesCommands = useReactToPrint({
    content: () => componentRefNoBattlesCommands.current
  });
  const handlePrintBattlesButNoCommands = useReactToPrint({
    content: () => componentRefBattlesButNoCommands.current
  });
  const handlePrintListImages = useReactToPrint({
    content: () => componentRefImages.current
  });
  return (
    <React.Fragment>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handlePrintMenuClose}
      >
        <MenuItem
          onClick={() => {
            handlePrint();
            handlePrintMenuClose();
          }}
        >
          With Battle/Command Cards
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePrintNoBattlesCommands();
            handlePrintMenuClose();
          }}
        >
          Without Battle/Command Cards
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePrintBattlesButNoCommands();
            handlePrintMenuClose();
          }}
        >
          With Battle Cards & Without Command Cards
        </MenuItem>
      </Menu>
      <Chip
        clickable
        variant="outlined"
        label="Print List"
        icon={<PrintIcon />}
        style={{ marginRight: 4, marginBottom: 4 }}
        onClick={handlePrintMenuOpen}
      />
      <div style={{ display: 'none' }}>
        <PrintList
          showBattlesAndCommands={true}
          ref={componentRef}
          currentList={currentList}
        />
        <PrintList
          showBattlesAndCommands={false}
          ref={componentRefNoBattlesCommands}
          currentList={currentList}
        />
        <PrintList
          showBattlesNoCommands={true}
          ref={componentRefBattlesButNoCommands}
          currentList={currentList}
        />
      </div>
    </React.Fragment>
  );
};

export default PrintExportButton;
