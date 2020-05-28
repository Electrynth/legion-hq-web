import React from 'react';
import QRCode from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';
import { Chip } from '@material-ui/core';
import { Print as PrintIcon } from '@material-ui/icons';
import { generateTournamentText } from 'constants/listOperations';
import generateLink from './generateLink';

class PrintList extends React.Component {
  render() {
    const { currentList } = this.props;
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
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-evenly'
        }}
      >
        <div>
          {units.map((line, i) => <div key={`${line}_${i}`}>{line}</div>)}
        </div>
        <div style={{ display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-between' }}>
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
          <QRCode size={147} value={listLink} />
        </div>
      </div>
    )
  }
}

function PrintExportButton({ currentList }) {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  return (
    <React.Fragment>
      <Chip
        clickable
        variant="outlined"
        label="Print List"
        icon={<PrintIcon />}
        style={{ marginRight: 4, marginBottom: 4 }}
        onClick={handlePrint}
      />
      <div style={{ display: 'none' }}>
        <PrintList ref={componentRef} currentList={currentList} />
      </div>
    </React.Fragment>
  );
};

export default PrintExportButton;
