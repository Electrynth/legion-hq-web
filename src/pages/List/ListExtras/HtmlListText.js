import React from 'react';
import _ from 'lodash';
import cards from 'constants/cards';
import ranks from 'constants/ranks';
import legionModes from 'constants/legionModes';
import interactions from 'constants/cardInteractions';
import listTemplate from 'constants/listTemplate';

function generateHTMLText(
  list, showPoints = true, showCommands = false, showBattles = false
) {
  let header = `${list.title ? list.title : 'Untitled'}<br>`;
  header += `${list.pointTotal}/${legionModes[list.mode].maxPoints}<br>`;
  let units = '';
  list.units.forEach(unit => {
    const unitCard = cards[unit.unitId];
    if (unit.count === 1) {
      if (unit.unitId === 'pz') { // Kraken
        units += `${unitCard.cardName} - Kraken (${unit.totalUnitCost})<br>`;
      } else if (unit.unitId === 'pz') { // Kalani
        units += `${unitCard.cardName} - Kalani (${unit.totalUnitCost})<br>`;
      } else {
        units += `${unitCard.cardName} (${unit.totalUnitCost})<br>`;
      }
      for (let j = 0; j < unit.upgradesEquipped.length; j++) {
        if (unit.upgradesEquipped[j]) {
          const upgradeCard = cards[unit.upgradesEquipped[j]];
          if (unit.loadoutUpgrades && unit.loadoutUpgrades[j]) {
            const loadoutCard = cards[unit.loadoutUpgrades[j]];
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})`;
            units += `/${loadoutCard.cardName} (${loadoutCard.cost})<br>`;
          } else {
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})<br>`;
          }
        }
      }
      if (unit.counterpart) {
        const { counterpart } = unit;
        const counterpartCard = cards[counterpart.counterpartId];
        units += `${counterpartCard.cardName} (${unit.counterpart.totalUnitCost})\n`;
        for (let j = 0; j < counterpart.upgradesEquipped.length; j++) {
          if (counterpart.upgradesEquipped[j]) {
            const upgradeCard = cards[counterpart.upgradesEquipped[j]];
            if (counterpart.loadoutUpgrades && counterpart.loadoutUpgrades[j]) {
              const loadoutCard = cards[counterpart.loadoutUpgrades[j]];
              units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})`;
              units += `/${loadoutCard.cardName} (${loadoutCard.cost})<br>`;
            } else {
              units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})<br>`;
            }
          }
        }
      }
    } else {
      for (let i = 0; i < unit.count; i++) {
        units += `${unitCard.cardName} (${unit.totalUnitCost / unit.count})<br>`;
        for (let j = 0; j < unit.upgradesEquipped.length; j++) {
          if (unit.upgradesEquipped[j]) {
            const upgradeCard = cards[unit.upgradesEquipped[j]];
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})<br>`;
          }
        }
      }
    }
  });
  let commands = '';
  list.commandCards.forEach(commandId => {
    let pips = '••••';
    const commandCard = cards[commandId];
    if (commandCard.cardSubtype === '1') pips = '•';
    else if (commandCard.cardSubtype === '2') pips = '••';
    else if (commandCard.cardSubtype === '3') pips = '•••';
    commands += `${pips}${commandCard.cardName}<br>`;
  });
  if (commands !== '') {
    commands = `<br>Commands:<br>${commands}`;
    commands += '••••Standing Orders<br>';
  }
  let contingencies = '';
  if (list.contingencies && list.contingencies.length > 0) {
    contingencies = '<br>Contingencies:<br>';
    list.contingencies.forEach(commandId => {
      let pips = '••••';
      const commandCard = cards[commandId];
      if (commandCard.cardSubtype === '1') pips = '•';
      else if (commandCard.cardSubtype === '2') pips = '••';
      else if (commandCard.cardSubtype === '3') pips = '•••';
      contingencies += `${pips}${commandCard.cardName}<br>`;
    });
  }
  let objectives = '';
  let deployments = '';
  let conditions = '';
  if (list.objectiveCards.length > 0) {
    objectives += 'Objectives:<br>';
    list.objectiveCards.forEach((id, i) => {
      const card = cards[id];
      objectives += ` - ${card.cardName}<br>`;
    });
  }
  if (list.deploymentCards.length > 0) {
    deployments += 'Deployments:<br>';
    list.deploymentCards.forEach((id, i) => {
      const card = cards[id];
      deployments += ` - ${card.cardName}<br>`;
    });
  }
  if (list.conditionCards.length > 0) {
    conditions += 'Conditions:<br>';
    list.conditionCards.forEach((id, i) => {
      const card = cards[id];
      conditions += ` - ${card.cardName}<br>`;
    });
  }
  let battle = '';
  if (objectives + deployments + conditions !== '') battle = `<br>Battle Deck<br>`;
  return '<html><p>' + header + units + commands + contingencies + battle + objectives + deployments + conditions + '</p></html>';
}

function generateUnitComponent(unit, index) {
  let unitText = [];
  const unitCard = cards[unit.unitId];
  if (unit.count === 1) {
    if (unit.unitId === 'pz') { // Kraken
      unitText.push(`${unitCard.cardName} - Kraken (${unit.totalUnitCost})`);
    } else if (unit.unitId === 'pz') { // Kalani
      unitText.push(`${unitCard.cardName} - Kalani (${unit.totalUnitCost})`);
    } else {
      unitText.push(`${unitCard.cardName} (${unit.totalUnitCost})`);
    }
    unitText.push(<br/>)
    for (let j = 0; j < unit.upgradesEquipped.length; j++) {
      if (unit.upgradesEquipped[j]) {
        const upgradeCard = cards[unit.upgradesEquipped[j]];
        if (unit.loadoutUpgrades && unit.loadoutUpgrades[j]) {
          const loadoutCard = cards[unit.loadoutUpgrades[j]];
          unitText.push(` - ${upgradeCard.cardName} (${upgradeCard.cost})`);
          unitText.push(`/${loadoutCard.cardName} (${loadoutCard.cost})`);
          unitText.push(<br/>);
        } else {
          unitText.push(` - ${upgradeCard.cardName} (${upgradeCard.cost})`);
          unitText.push(<br/>);
        }
      }
    }
  }
  return <div key={`${unit.unitHash}_${index}`}>{unitText}<br/></div>;
}

function HtmlListText({ list }) {
  return (
    <div>
      <b>{list.title ? list.title : 'Untitled'}</b>
      <br/>
      {list.units.map((unit, index) => {
        return generateUnitComponent(unit, index);
      })}
    </div>
  );
};

export default HtmlListText;
