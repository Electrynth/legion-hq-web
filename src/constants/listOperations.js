import _ from 'lodash';
import cards from 'constants/cards';
import ranks from 'constants/ranks';
import legionModes from 'constants/legionModes';
import interactions from 'constants/cardInteractions';
import listTemplate from 'constants/listTemplate';

function countPoints(list) {
  list.pointTotal = 0;
  list.rankInteractions = {};
  list.units.forEach((unit, unitIndex) => {
    const unitCard = cards[unit.unitId];
    unit.totalUnitCost = unitCard.cost;
    if (unitCard.id in interactions.entourages) {
      const interaction = interactions.entourages[unitCard.id];
      if (interaction.isConditionMet(list, unit)) {
        list.rankInteractions[unitCard.id] = interaction.boundaryDelta;
      }
    }
    unit.upgradeInteractions = {};
    unit.upgradesEquipped.forEach((upgradeId, upgradeIndex) => {
      if (upgradeId) {
        const upgradeCard = cards[upgradeId];
        unit.totalUnitCost += upgradeCard.cost;
        if (upgradeId in interactions.upgradePoints) {
          const interaction = interactions.upgradePoints[upgradeId];
          if (interaction.isConditionMet(list, unit)) {
            unit.totalUnitCost += interaction.pointDelta;
            unit.upgradeInteractions[upgradeId] = interaction.pointDelta;
          }
        }
      }
    });
    unit.totalUnitCost *= unit.count;
    list.pointTotal += unit.totalUnitCost;
    if (unit.counterpart) {
      const counterpartCard = cards[unit.counterpart.counterpartId];
      unit.counterpart.totalUnitCost = counterpartCard.cost;
      unit.counterpart.upgradesEquipped.forEach(upgradeId => {
        if (upgradeId) {
          const upgradeCard = cards[upgradeId];
          unit.counterpart.totalUnitCost += upgradeCard.cost;
        }
      });
      list.pointTotal += unit.counterpart.totalUnitCost;
      list.uniques.push(unit.counterpart.counterpartId);
    }
  });
  return list;
}

function rehashList(list) {
  const unitObjectStrings = [];
  for (let i = 0; i < list.units.length; i++) {
    const unit = list.units[i];
    const unitCard = cards[unit.unitId];
    let unitObjectString = unitCard.id;
    for (let j = 0; j < unit.upgradesEquipped.length; j++) {
      const upgradeId = unit.upgradesEquipped[j];
      if (upgradeId) {
        unitObjectString += upgradeId;
      }
    }
    unitObjectStrings.push(unitObjectString);
  }
  list.unitObjectStrings = unitObjectStrings;
  return list;
}

function consolidate(list) {
  let hasContingencyKeyword = false;
  list.commanders = [];
  list.uniques = [];
  list.unitCounts = { ...listTemplate.unitCounts };
  for (let i = 0; i < list.units.length; i++) {
    const unit = list.units[i];
    if (!unit.loadoutUpgrades) unit.loadoutUpgrades = [];
    const unitCard = cards[unit.unitId];
    unit.hasUniques = false;
    if (unitCard.isUnique) {
      list.uniques.push(unitCard.id);
      unit.hasUniques = true;
    }
    if (unitCard.keywords.includes('Contingency')) hasContingencyKeyword = true;
    if (unitCard.rank === 'commander' || unitCard.rank === 'operative') {
      list.commanders.push(unitCard.cardName);
    }
    for (let j = 0; j < unit.upgradesEquipped.length; j++) {
      const upgradeId = unit.upgradesEquipped[j];
      if (upgradeId) {
        const upgradeCard = cards[upgradeId];
        if (upgradeCard.isUnique) {
          list.uniques.push(upgradeCard.id);
          unit.hasUniques = true;
        }
      }
    }
    for (let j = 0; j < unit.loadoutUpgrades.length; j++) {
      const upgradeId = unit.loadoutUpgrades[j];
      if (upgradeId) {
        const upgradeCard = cards[upgradeId];
        if (upgradeCard.isUnique) {
          list.uniques.push(upgradeCard.id);
          unit.hasUniques = true;
        }
      }
    }
    list.unitCounts[unitCard.rank] += unit.count;
  }
  for (let i = list.commandCards.length - 1; i > -1 ; i--) {
    const { commander } = cards[list.commandCards[i]];
    if (commander && !list.commanders.includes(commander)) {
      list = removeCommand(list, i);
    }
  }
  if (list.contingencies) {
    for (let i = list.contingencies.length - 1; i > -1; i--) {
      const { commander } = cards[list.contingencies[i]];
      if (commander && !list.commanders.includes(commander)) {
        list = removeContingency(list, i);
      }
    }
  }
  if (!hasContingencyKeyword) list.contingencies = [];
  list.commandCards = sortCommandIds(list.commandCards);
  return countPoints(list);
}

function getNumActivations(list) {
  return list.units.reduce((num, unit) => {
    num += unit.count;
    return num;
  }, 0);
}

function generateTournamentText(
  list, showPoints = true, showCommands = false, showBattles = false
) {
  let header = `${list.title ? list.title : 'Untitled'}\n`;
  header += `${list.pointTotal}/${legionModes[list.mode].maxPoints}\n`;
  let units = '';
  list.units.forEach(unit => {
    const unitCard = cards[unit.unitId];
    if (unit.count === 1) {
      units += `${unitCard.cardName} (${unit.totalUnitCost})\n`;
      for (let j = 0; j < unit.upgradesEquipped.length; j++) {
        if (unit.upgradesEquipped[j]) {
          const upgradeCard = cards[unit.upgradesEquipped[j]];
          if (unit.loadoutUpgrades && unit.loadoutUpgrades[j]) {
            const loadoutCard = cards[unit.loadoutUpgrades[j]];
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})`;
            units += `/${loadoutCard.cardName} (${loadoutCard.cost})\n`;
          } else {
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})\n`;
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
              units += `/${loadoutCard.cardName} (${loadoutCard.cost})\n`;
            } else {
              units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})\n`;
            }
          }
        }
      }
    } else {
      for (let i = 0; i < unit.count; i++) {
        units += `${unitCard.cardName} (${unit.totalUnitCost / unit.count})\n`;
        for (let j = 0; j < unit.upgradesEquipped.length; j++) {
          if (unit.upgradesEquipped[j]) {
            const upgradeCard = cards[unit.upgradesEquipped[j]];
            units += ` - ${upgradeCard.cardName} (${upgradeCard.cost})\n`;
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
    commands += `${pips}${commandCard.cardName}\n`;
  });
  if (commands !== '') {
    commands = `\nCommands:\n${commands}`;
    commands += '••••Standing Orders\n';
  }
  let contingencies = '';
  if (list.contingencies && list.contingencies.length > 0) {
    contingencies = '\nContingencies:\n';
    list.contingencies.forEach(commandId => {
      let pips = '••••';
      const commandCard = cards[commandId];
      if (commandCard.cardSubtype === '1') pips = '•';
      else if (commandCard.cardSubtype === '2') pips = '••';
      else if (commandCard.cardSubtype === '3') pips = '•••';
      contingencies += `${pips}${commandCard.cardName}\n`;
    });
  }
  let objectives = '';
  let deployments = '';
  let conditions = '';
  if (list.objectiveCards.length > 0) {
    objectives += 'Objectives:\n';
    list.objectiveCards.forEach((id, i) => {
      const card = cards[id];
      objectives += ` - ${card.cardName}\n`;
    });
  }
  if (list.deploymentCards.length > 0) {
    deployments += 'Deployments:\n';
    list.deploymentCards.forEach((id, i) => {
      const card = cards[id];
      deployments += ` - ${card.cardName}\n`;
    });
  }
  if (list.conditionCards.length > 0) {
    conditions += 'Conditions:\n';
    list.conditionCards.forEach((id, i) => {
      const card = cards[id];
      conditions += ` - ${card.cardName}\n`;
    });
  }
  let battle = '';
  if (objectives + deployments + conditions !== '') battle = `\nBattle Deck\n`;
  return header + units + commands + contingencies + battle + objectives + deployments + conditions;
}

// • × •

function generateStandardText(list) {
  let header = list.title ? list.title : 'Untitled';
  let points = `\n${list.pointTotal}/${legionModes[list.mode].maxPoints}`;
  const numActivations = getNumActivations(list)
  points += ` (${numActivations} activation${numActivations === 1 ? '' : 's'})\n`;
  let commander = '';
  let counterpart = '';
  let operative = '';
  let corps = '';
  let special = '';
  let support = '';
  let heavy = '';
  const unitLine = (unit) => {
    const id = unit.unitId ? unit.unitId : unit.counterpartId;
    const unitCard = cards[id];
    let line = ' - ';
    if (unit.count > 1) line += `${unit.count}× `;
    line += unitCard.displayName ? unitCard.displayName : unitCard.cardName;
    if (unitCard.cost !== unit.totalUnitCost) {
      line += ` (${unitCard.cost}): `;
      unit.upgradesEquipped.forEach((upgradeId, i) => {
        if (!upgradeId) return;
        const upgradeCard = cards[upgradeId];
        if (unit.loadoutUpgrades && unit.loadoutUpgrades[i]) {
          const loadoutCard = cards[unit.loadoutUpgrades[i]];
          line += upgradeCard.displayName ? upgradeCard.displayName : upgradeCard.cardName;
          line += ` (${upgradeCard.cost})/`;
          line += loadoutCard.displayName ? loadoutCard.displayName : loadoutCard.cardName;
          line += ` (${loadoutCard.cost}), `;
        } else {
          line += upgradeCard.displayName ? upgradeCard.displayName : upgradeCard.cardName;
          line += ` (${upgradeCard.cost}), `;
        }
      });
      line = line.substring(0, line.length - 2)
      line += ` = ${unit.totalUnitCost}`;
    } else line += ` = ${unitCard.cost}`;
    return line + '\n';
  }
  list.units.forEach((unit, i) => {
    const unitCard = cards[unit.unitId];
    if (unit.counterpart) counterpart += unitLine(unit.counterpart);
    if (unitCard.rank === 'commander') commander += unitLine(unit);
    if (unitCard.rank === 'operative') operative += unitLine(unit);
    if (unitCard.rank === 'corps') corps += unitLine(unit);
    if (unitCard.rank === 'special') special += unitLine(unit);
    if (unitCard.rank === 'support') support += unitLine(unit);
    if (unitCard.rank === 'heavy') heavy += unitLine(unit);
  });
  let units = '';
  if (commander) units += `Commanders:\n${commander}`;
  if (counterpart && list.faction === 'empire') units += `Counterparts:\n${counterpart}`;
  if (operative) units += `Operative:\n${operative}`;
  if (counterpart && list.faction !== 'empire') units += `Counterparts:\n${counterpart}`;
  if (corps) units += `Corps:\n${corps}`;
  if (special) units += `Special Forces:\n${special}`;
  if (support) units += `Support:\n${support}`;
  if (heavy) units += `Heavy:\n${heavy}`;

  let commands = '\nCommands: ';
  list.commandCards.forEach(id => {
    const commandCard = cards[id];
    if (commandCard.cardSubtype === '1') commands += '• ';
    else if (commandCard.cardSubtype === '2') commands += '•• ';
    else if (commandCard.cardSubtype === '3') commands += '••• ';
    else commands += '•••• ';
    commands += `${commandCard.cardName}, `;
  });
  if (commands !== '') commands += '•••• Standing Orders';
  let contingencies = '';
  if (list.contingencies && list.contingencies.length > 0) {
    contingencies += '\nContingencies: ';
    list.contingencies.forEach(id => {
      const commandCard = cards[id];
      if (commandCard.cardSubtype === '1') contingencies += '• ';
      else if (commandCard.cardSubtype === '2') contingencies += '•• ';
      else if (commandCard.cardSubtype === '3') contingencies += '••• ';
      else contingencies += '•••• ';
      contingencies += `${commandCard.cardName}, `;
    });
  }
  return header + points + units + commands + contingencies;
}

function generateTTSJSONText(list) {
  const ttsJSON = { author: 'Legion HQ' };

  const idToName = {
    "nc": "Offensive Stance",
    "dz": "A-180 Config",
    "ea": "A-300 Config",
    "kh": "A-280-CFE Config",
    "gn": "E-11D Config",
    "np": "J-19 Bo-Rifle",
    "Ci": "Clear Conditions",
    "Cl": "War Weary",
    "Dj": "Battle Lines",
    "ff": "Ax-108 \"Ground Buzzer\"",
    "fg": "Mo/Dk Power Harpoon",
    "bh": "TX-225 GAVw Occupier Combat Assault Tank",
    "on": "LAAT/le Patrol Transport",
    "oo": "LAAT/le Patrol Transport",
    "ig": "CM-0/93 Trooper",
    "kd": "Z-6 Phase II Trooper",
    "kt": "\"Bunker Buster\" Shells",
    "le": "EMP \"Droid Poppers\""
  };

  ttsJSON.points = list.pointTotal;

  if (list.faction === 'rebels') ttsJSON.armyFaction = 'rebel';
  else if (list.faction === 'empire') ttsJSON.armyFaction = 'imperial';
  else if (list.faction === 'republic') ttsJSON.armyFaction = 'republic';
  else ttsJSON.armyFaction = 'separatist';

  ttsJSON.commandCards = [];
  for (let i = 0; i < list.commandCards.length; i++) {
    const commandCard = cards[list.commandCards[i]];
    ttsJSON.commandCards.push(commandCard.cardName);
  }
  ttsJSON.commandCards.push('Standing Orders');

  ttsJSON.contingencies = [];
  if (list.contingencies) {
    for (let i = 0; i < list.contingencies.length; i++){
      const commandCard = cards[list.contingencies[i]];
      ttsJSON.contingencies.push(commandCard.cardName);
    }
  }

  ttsJSON.units = [];
  for (let i = 0; i < list.units.length; i++) {
    const unitJSON = { name: '', upgrades: [], loadout: [] };
    const unit = list.units[i];
    const unitCard = cards[unit.unitId];

    if (idToName[unit.unitId]) unitJSON.name = idToName[unit.unitId];
    else if (unitCard.title) unitJSON.name = `${unitCard.cardName} ${unitCard.title}`;
    else unitJSON.name = unitCard.cardName;

    for (let j = 0; j < unit.upgradesEquipped.length; j++) {
      if (unit.upgradesEquipped[j]) {
        if (idToName[unit.upgradesEquipped[j]]) {
          unitJSON.upgrades.push(idToName[unit.upgradesEquipped[j]]);
        } else {
          const upgradeCard = cards[unit.upgradesEquipped[j]];
          unitJSON.upgrades.push(upgradeCard.cardName);
        }
      }
    }
    if (unit.loadoutUpgrades) {
      for (let j = 0; j < unit.loadoutUpgrades.length; j++) {
        if (unit.loadoutUpgrades[j]) {
          if (idToName[unit.loadoutUpgrades[j]]) {
            unitJSON.loadout.push(idToName[unit.loadoutUpgrades[j]]);
          } else {
            const upgradeCard = cards[unit.loadoutUpgrades[j]];
            unitJSON.loadout.push(upgradeCard.cardName);
          }
        }
      }
    }
    if (unit.counterpart) {
      const counterpart = unit.counterpart;
      const counterpartCard = cards[counterpart.counterpartId];
      unitJSON.upgrades.push(`${counterpartCard.cardName} ${counterpartCard.title}`);
      for (let j = 0; j < counterpart.upgradesEquipped.length; j++) {
        if (counterpart.upgradesEquipped[j]) {
          if (idToName[counterpart.upgradesEquipped[j]]) {
            unitJSON.upgrades.push(idToName[counterpart.upgradesEquipped[j]]);
          } else {
            const upgradeCard = cards[counterpart.upgradesEquipped[j]];
            unitJSON.upgrades.push(upgradeCard.cardName);
          }
        }
      }
      if (counterpart.loadoutUpgrades) {
        for (let j = 0; j < counterpart.loadoutUpgrades.length; j++) {
          if (counterpart.loadoutUpgrades[j]) {
            if (idToName[counterpart.loadoutUpgrades[j]]) {
              unitJSON.loadout.push(idToName[counterpart.loadoutUpgrades[j]]);
            } else {
              const upgradeCard = cards[counterpart.loadoutUpgrades[j]];
              unitJSON.loadout.push(upgradeCard.cardName);
            }
          }
        }
      }
    };
    if (unitCard.flaw) unitJSON.upgrades.push(cards[unitCard.flaw].cardName);
    if (unit.count > 1) {
      for (let j = 0; j < unit.count; j++) ttsJSON.units.push(unitJSON);
    } else {
      ttsJSON.units.push(unitJSON);
    }
  }

  ttsJSON.battlefieldDeck = { conditions: [], deployment: [], objective: [] };
  for (let i = 0; i < list.objectiveCards.length; i++) {
    if (idToName[list.objectiveCards[i]]) {
      ttsJSON.battlefieldDeck.objective.push(idToName[list.objectiveCards[i]]);
    } else {
      const battlefieldCard = cards[list.objectiveCards[i]];
      ttsJSON.battlefieldDeck.objective.push(battlefieldCard.cardName);
    }
  }
  for (let i = 0; i < list.deploymentCards.length; i++) {
    if (idToName[list.deploymentCards[i]]) {
      ttsJSON.battlefieldDeck.deployment.push(idToName[list.deploymentCards[i]]);
    } else {
      const battlefieldCard = cards[list.deploymentCards[i]];
      ttsJSON.battlefieldDeck.deployment.push(battlefieldCard.cardName);
    }
  }
  for (let i = 0; i < list.conditionCards.length; i++) {
    if (idToName[list.conditionCards[i]]) {
      ttsJSON.battlefieldDeck.conditions.push(idToName[list.conditionCards[i]]);
    } else {
      const battlefieldCard = cards[list.conditionCards[i]];
      ttsJSON.battlefieldDeck.conditions.push(battlefieldCard.cardName);
    }
  }

  return JSON.stringify(ttsJSON, null, 4);
}

function generateMinimalText(list) {
  let header = `${list.pointTotal}/${legionModes[list.mode].maxPoints}`;
  const numActivations = getNumActivations(list)
  header += ` (${numActivations} activation${numActivations === 1 ? '' : 's'})\n`;
  let units = '';
  list.units.forEach(unit => {
    const unitCard = cards[unit.unitId];
    let line = '';
    if (unit.count > 1) line += `${unit.count}× `;
    line += `${unitCard.cardName} `;
    let upgrades = '';
    let loadout = '';
    unit.upgradesEquipped.forEach((id, i) => {
      if (id) {
        const upgradeCard = cards[id];
        upgrades += `${upgradeCard.cardName}, `;
        if (unit.loadoutUpgrades && unit.loadoutUpgrades.length > 0) {
           if (unit.loadoutUpgrades[i]) {
             const loadoutCard = cards[unit.loadoutUpgrades[i]];
             loadout += `${loadoutCard.cardName}, `;
           } else loadout += 'none, ';
        }
      }
    });
    if (upgrades !== '') {
      upgrades = upgrades.substring(0, upgrades.length - 2)
      line += `(${upgrades})`;
    }
    if (loadout !== '') {
      loadout = loadout.substring(0, loadout.length - 2);
      line += `\n - Loadout: (${loadout})`;
    }
    let counterpart = '';
    if (unit.counterpart) {
      let cUpgrades = '';
      let cLoadout = '';
      const counterpartCard = cards[unit.counterpart.counterpartId];
      counterpart += `\n${counterpartCard.cardName}`;
      unit.counterpart.upgradesEquipped.forEach((id, i) => {
        if (id) {
          const upgradeCard = cards[id];
          cUpgrades += `${upgradeCard.cardName}, `;
          if (unit.counterpart.loadoutUpgrades) {
            if (unit.counterpart.loadoutUpgrades[i]) {
              const loadoutCard = cards[unit.counterpart.loadoutUpgrades[i]];
              cLoadout += `${loadoutCard.cardName}, `;
            } else cLoadout += 'none, ';
          }
        }
      });
      if (cUpgrades !== '') {
        cUpgrades = cUpgrades.substring(0, cUpgrades.length - 2);
        counterpart += ` (${cUpgrades})`;
      }
      if (cLoadout !== '') {
        cLoadout = cLoadout.substring(0, cLoadout.length - 2);
        counterpart += `\n - Loadout: (${cLoadout})`;
      }
    }
    line += counterpart;
    units += line + '\n';
  });
  let commands = list.commandCards.length > 0 ? 'Commands: ' : '';
  list.commandCards.forEach((id, i) => {
    const commandCard = cards[id];
    if (commandCard.cardSubtype === '1') commands += '• ';
    else if (commandCard.cardSubtype === '2') commands += '•• ';
    else if (commandCard.cardSubtype === '3') commands += '••• ';
    else commands += '•••• ';
    commands += `${commandCard.cardName}, `;
  });
  if (commands !== '') commands += '•••• Standing Orders';
  let contingencies = '';
  if (list.contingencies && list.contingencies.length > 0) {
    contingencies += '\nContingencies: ';
    list.contingencies.forEach((id, i) => {
      const commandCard = cards[id];
      if (commandCard.cardSubtype === '1') contingencies += '• ';
      else if (commandCard.cardSubtype === '2') contingencies += '•• ';
      else if (commandCard.cardSubtype === '3') contingencies += '••• ';
      else contingencies += '•••• ';
      contingencies += `${commandCard.cardName}, `;
    });
  }
  // let objectives = '';
  // let deployments = '';
  // let conditions = '';
  // if (list.objectiveCards.length > 0) {
  //   objectives += '\nObjectives: ';
  //   list.objectiveCards.forEach((id, i) => {
  //     const card = cards[id];
  //     objectives += `${card.cardName}, `;
  //   });
  //   objectives = objectives.substring(0, objectives.length - 2);
  // }
  // if (list.deploymentCards.length > 0) {
  //   deployments += '\nDeployments: ';
  //   list.deploymentCards.forEach((id, i) => {
  //     const card = cards[id];
  //     deployments += `${card.cardName}, `;
  //   });
  //   deployments = deployments.substring(0, deployments.length - 2);
  // }
  // if (list.conditionCards.length > 0) {
  //   conditions += '\nConditions: ';
  //   list.conditionCards.forEach((id, i) => {
  //     const card = cards[id];
  //     conditions += `${card.cardName}, `;
  //   });
  //   conditions = conditions.substring(0, conditions.length - 2);
  // }
  // + objectives + deployments + conditions;
  return header + units + commands + contingencies;
}

function deleteItem(items, i) {
  return items.slice(0, i).concat(items.slice(i + 1, items.length))
}

function changeListTitle(list, title) {
  return { ...list, title: title.substring(0, 30) };
}

function toggleListMode(list) {
  const modes = Object.keys(legionModes);
  let modeIndex = modes.indexOf(list.mode);
  modeIndex += 1;
  modeIndex %= modes.length;
  list.mode = modes[modeIndex];
  return list;
}

function setListMode(list, mode) {
  if (legionModes[mode]) {
    list.mode = mode;
  }
  return list;
}

function findUnitHash(list, unitHash) {
  return list.unitObjectStrings.indexOf(unitHash);
}

function getUnitHash(unit) {
  return `${unit.unitId}${unit.upgradesEquipped.join('')}`;
}

function equipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId) {
  const unit = list.units[unitIndex];
  const counterpart = unit.counterpart;
  counterpart.loadoutUpgrades[upgradeIndex] = upgradeId;
  return consolidate(list);
}

function unequipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex) {
  const unit = list.units[unitIndex];
  const counterpart = unit.counterpart;
  if (counterpart.loadoutUpgrades[upgradeIndex]) {
    counterpart.loadoutUpgrades[upgradeIndex] = null;
  }
  return consolidate(list);
}

function equipLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId) {
  const unit = list.units[unitIndex];
  unit.loadoutUpgrades[upgradeIndex] = upgradeId;
  return consolidate(list);
}

function unequipLoadoutUpgrade(list, unitIndex, upgradeIndex) {
  const unit = list.units[unitIndex];
  if (unit.loadoutUpgrades[upgradeIndex]) {
    unit.loadoutUpgrades[upgradeIndex] = null;
  }
  return consolidate(list);
}

function equipUpgradeToAll(list, unitIndex, upgradeIndex, upgradeId) {
  // applying upgrade to multiple units
  const unit = list.units[unitIndex];
  const upgradeCard = cards[upgradeId];
  const newUnit = JSON.parse(JSON.stringify(unit));
  newUnit.upgradesEquipped[upgradeIndex] = upgradeId;
  const newUnitHash = getUnitHash(newUnit);
  newUnit.unitObjectString = newUnitHash;
  if ('additionalUpgradeSlots' in upgradeCard) {
    newUnit.additionalUpgradeSlots = [upgradeCard.additionalUpgradeSlots[0]];
    newUnit.upgradesEquipped.push(null);
  }
  if (list.unitObjectStrings.includes(newUnitHash)) {
    list.units[list.unitObjectStrings.indexOf(newUnitHash)].count += unit.count;
    list.units = deleteItem(list.units, unitIndex);
  } else {
    list.units[unitIndex] = newUnit;
    list.unitObjectStrings[unitIndex] = newUnitHash;
  }
  return consolidate(list);
}

function equipUpgradeToOne(list, unitIndex, upgradeIndex, upgradeId) {
  const unit = list.units[unitIndex];
  const upgradeCard = cards[upgradeId];
  const newUnit = JSON.parse(JSON.stringify(unit));
  newUnit.count = 1;
  newUnit.upgradesEquipped[upgradeIndex] = upgradeId;
  newUnit.unitObjectString = getUnitHash(newUnit);
  if ('additionalUpgradeSlots' in upgradeCard) {
    newUnit.additionalUpgradeSlots = [upgradeCard.additionalUpgradeSlots[0]];
    newUnit.upgradesEquipped.push(null);
  }
  const newUnitHashIndex = findUnitHash(list, newUnit.unitObjectString);
  if (newUnitHashIndex > -1) {
    list = incrementUnit(list, newUnitHashIndex);
  } else {
    list.units.splice(unitIndex + 1, 0, newUnit);
    list.unitObjectStrings.splice(unitIndex + 1, 0, newUnit.unitObjectString);
  }
  list = decrementUnit(list, unitIndex);
  return consolidate(list);
}

function equipCounterpartUpgrade(list, unitIndex, upgradeIndex, upgradeId) {
  // TODO: change if counterparts could ever equip unique upgrades
  const counterpart = list.units[unitIndex].counterpart;
  const upgradeCard = cards[upgradeId];
  counterpart.upgradesEquipped[upgradeIndex] = upgradeId;
  counterpart.totalUnitCost += upgradeCard.cost;
  return consolidate(list);
}

function unequipCounterpartUpgrade(list, unitIndex, upgradeIndex) {
  // TODO: change if counterparts could ever equip unique upgrades
  const counterpart = list.units[unitIndex].counterpart;
  const upgradeCard = cards[counterpart.upgradesEquipped[upgradeIndex]];
  counterpart.upgradesEquipped[upgradeIndex] = null;
  counterpart.totalUnitCost -= upgradeCard.cost;
  if (counterpart.loadoutUpgrades.length > 0) {
    counterpart.loadoutUpgrades[upgradeIndex] = null;
  }
  return consolidate(list);
}

function addCounterpart(list, unitIndex, counterpartId) {
  const counterpartCard = cards[counterpartId];
  const unit = list.units[unitIndex];
  const unitCard = cards[unit.unitId];
  unit.counterpart = {
    count: 1,
    counterpartId: counterpartCard.id,
    totalUnitCost: counterpartCard.cost,
    upgradesEquipped: [],
    loadoutUpgrades: [],
    additionalUpgradeSlots: []
  };
  for (let i = 0; i < counterpartCard.upgradeBar.length; i++) {
    unit.counterpart.upgradesEquipped.push(null);
    if (unitCard.keywords.includes('Loadout')) {
      unit.counterpart.loadoutUpgrades.push(null);
    }
  }
  return consolidate(list);
}

function removeCounterpart(list, unitIndex) {
  const counterpart = list.units[unitIndex].counterpart;
  list.uniques = deleteItem(list.uniques, list.uniques.indexOf(counterpart.counterpartId));
  delete list.units[unitIndex].counterpart;
  return consolidate(list);
}

function addUnit(list, unitId, stackSize = 1) {
  const unitCard = cards[unitId];
  const unitIndex = findUnitHash(list, unitId);

  if (unitCard.keywords.includes('Contingencies')) {
    if (!list.contingencies) list.contingencies = [];
  }
  if (unitIndex > -1) {
    list.units[unitIndex].count += stackSize;
    list.units[unitIndex].totalUnitCost += unitCard.cost * stackSize;
  } else {
    const newUnitObject = {
      unitId,
      count: unitCard.isUnique ? 1 : stackSize,
      hasUniques: unitCard.isUnique,
      totalUnitCost: unitCard.cost * stackSize,
      unitObjectString: unitId,
      upgradesEquipped: [],
      loadoutUpgrades: [],
      additionalUpgradeSlots: []
    };
    for (let i = 0; i < unitCard.upgradeBar.length; i++) {
      newUnitObject.upgradesEquipped.push(null);
      if (unitCard.keywords.includes('Loadout')) {
        newUnitObject.loadoutUpgrades.push(null);
      }
    }
    list.units.push(newUnitObject);
    list.unitObjectStrings.push(unitId);
  }
  return consolidate(list);
}

function incrementUnit(list, index) {
  list.units[index].count += 1;
  return consolidate(list);
}

function decrementUnit(list, index) {
  const unitObject = list.units[index];
  if (unitObject.count === 1) {
    const unitCard = cards[unitObject.unitId];
    if (unitCard.keywords.includes('Contingencies')) {
      list.contingencies = [];
    }
    list.unitObjectStrings = deleteItem(list.unitObjectStrings, index);
    list.units = deleteItem(list.units, index);
  } else {
    list.units[index].count -= 1;
  }
  return consolidate(list);
}

function getEligibleUnitsToAdd(list, rank) {
  const validUnitIds = [];
  const cardsById = Object.keys(cards);
  for (let i = 0; i < cardsById.length; i++) {
    const id = cardsById[i];
    const card = cards[id];
    if (card.cardType !== 'unit') continue;
    if (card.rank !== rank) continue;
    if (!list.faction.includes(card.faction)) continue;
    if (list.uniques.includes(id)) continue;
    if (list.commanders.includes(card.cardName)) continue;
    if (card.detachment) {
      for (let i = 0; i < list.units.length; i++) {
        const unit = list.units[i];
        if (unit.unitId === card.detachment) {
          validUnitIds.push(id);
          break;
        }
      }
    } else {
      validUnitIds.push(id);
    }
  }
  return sortIds(validUnitIds);
}

function isRequirementsMet(requirements, unitCard) {
  if (requirements instanceof Array) {
    const operator = requirements[0];
    if (operator instanceof Object) {
      // requirements: [{cardName: 'Whatever'}]
      return _.isMatch(unitCard, operator);
    } else if (operator === 'NOT') {
      let operand = requirements[1];
      if (operand instanceof Array) {
        // requirements: ['NOT', [...]]
        operand = isRequirementsMet(operand, unitCard);
      } else {
        // requirements: ['NOT', {cardName: 'Whatever'}]
        return !_.isMatch(unitCard, operand);
      }
    } else if (operator === 'AND' || operator === 'OR') {
      let leftOperand = requirements[1];
      let rightOperand = requirements[2];
      if (leftOperand instanceof Array) {
        leftOperand = isRequirementsMet(leftOperand, unitCard);
      } else if (leftOperand instanceof Object) {
        leftOperand = _.isMatch(unitCard, leftOperand);
      }
      if (rightOperand instanceof Array) {
        rightOperand = isRequirementsMet(rightOperand, unitCard);
      } else if (rightOperand instanceof Object) {
        rightOperand = _.isMatch(unitCard, rightOperand);
      }
      if (operator === 'OR') {
        // requirements: ['OR', {cardName: 'Whatever'}, {cardType: 'Whatever'}]
        return leftOperand || rightOperand
      } else { // operator === 'AND'
        // requirements: ['AND', {cardName: 'Whatever'}, {cardType: 'Whatever'}]
        return leftOperand && rightOperand;
      }
    } else {
      // Empty array of requirements
      return true;
    }
  } else {
    // requirements: {cardName: 'Whatever'}
    return _.isMatch(unitCard, requirements);
  }
}

function getEquippableLoadoutUpgrades(
  list, upgradeType, id, upgradeIndex, upgradesEquipped, additionalUpgradeSlots
) {
  const upgrades = getEquippableUpgrades(
    list, upgradeType, id, upgradesEquipped, additionalUpgradeSlots
  );
  const validIds = upgrades.validIds;
  const invalidIds = upgrades.invalidIds;
  const validLoadoutUpgradeIds = [];
  const invalidLoadoutUpgradeIds = [...invalidIds];
  const parentUpgradeCard = cards[upgradesEquipped[upgradeIndex]];
  for (let i = 0; i < validIds.length; i++) {
    const upgradeId = validIds[i]
    const upgradeCard = cards[upgradeId];
    if (
      upgradeCard.cost <= parentUpgradeCard.cost &&
      upgradeId !== parentUpgradeCard.id
    ) {
      validLoadoutUpgradeIds.push(upgradeCard.id);
    } else {
      invalidLoadoutUpgradeIds.push(upgradeCard.id);
    }
  }
  return {
    validIds: validLoadoutUpgradeIds,
    invalidIds: invalidLoadoutUpgradeIds
  };
}

function addContingency(list, commandId) {
  list.contingencies.push(commandId);
  return list;
}

function addCommand(list, commandId) {
  list.commandCards.push(commandId);
  return list;
}

function addBattle(list, type, id) {
  if (type === 'objective') {
    list.objectiveCards.push(id);
  } else if (type === 'deployment') {
    list.deploymentCards.push(id);
  } else if (type === 'condition') {
    list.conditionCards.push(id);
  }
  return list;
}

function removeBattle(list, type, index) {
  if (type === 'objective') {
    list.objectiveCards = deleteItem(list.objectiveCards, index);
  } else if (type === 'deployment') {
    list.deploymentCards = deleteItem(list.deploymentCards, index);
  } else if (type === 'condition') {
    list.conditionCards = deleteItem(list.conditionCards, index);
  } else return;
  return list;
}

function removeContingency(list, contingencyIndex) {
  list.contingencies = deleteItem(list.contingencies, contingencyIndex);
  return list;
}

function removeCommand(list, commandIndex) {
  list.commandCards = deleteItem(list.commandCards, commandIndex);
  return list;
}

function sortCommandIds(cardIds) {
  return cardIds.sort((firstId, secondId) => {
    const firstType = Number.parseInt(cards[firstId].cardSubtype);
    const secondType = Number.parseInt(cards[secondId].cardSubtype);
    if (firstType > secondType) return 1;
    else if (firstType < secondType) return -1;
    return 0;
  });
}

function getEligibleBattlesToAdd(list, type) {
  const validIds = [];
  const invalidIds = [];
  const cardsById = Object.keys(cards);
  let currentCards;
  if (type === 'objective') currentCards = list.objectiveCards;
  else if (type === 'deployment') currentCards = list.deploymentCards;
  else if (type === 'condition') currentCards = list.conditionCards;
  else return;
  cardsById.forEach(id => {
    const card = cards[id];
    if (card.cardType !== 'battle') return;
    if (card.cardSubtype !== type) return;
    if (currentCards.includes(id)) return;
    if (currentCards.length > 3) invalidIds.push(id);
    if (list.mode === '500-point mode') {
      if (card.keywords.includes('Skirmish')) validIds.push(id);
      else invalidIds.push(id);
    } else {
      if (card.keywords.includes('Skirmish')) invalidIds.push(id);
      else validIds.push(id);
    }
  });
  return { validIds, invalidIds };
}

function getEligibleContingenciesToAdd(list) {
if (!list.contingencies) list.contingencies = [];
const validCommandIds = [];
const invalidCommandIds = [];
const cardsById = Object.keys(cards);
let numContingencies = 0;
list.units.forEach((unit) => {
  const unitCard = cards[unit.unitId];
  if (unitCard.contingencies && unitCard.contingencies > 0)
    numContingencies += unitCard.contingencies
});
cardsById.forEach(id => {
  const card = cards[id];
  if (card.cardType !== 'command') return;
  if (list.commandCards.includes(id)) return;
  if (list.contingencies.includes(id)) return;
  if (!list.faction.includes(card.faction)) return;
  if (id === 'aa') return;
  if (id === 'jl' || id === 'ka' || id ==='kb') return;
  if (
    list.contingencies.length >= numContingencies ||
    (card.commander && !list.commanders.includes(card.commander))
  ) {
    invalidCommandIds.push(id);
    return;
  }
  validCommandIds.push(id);
});
return {
  validIds: sortCommandIds(validCommandIds),
  invalidIds: sortCommandIds(invalidCommandIds)
};
}

function getEligibleCommandsToAdd(list) {
  const stormTideCommands = {
    'storm tide: infantry': ['AC', 'AE', 'AG'],
    'storm tide: armored': ['AB', 'AF', 'AJ'],
    'storm tide: special forces': ['AD', 'AH', 'AI']
  };
  const validCommandIds = [];
  const invalidCommandIds = [];
  const cardsById = Object.keys(cards);
  const pipCounts = { '1': 0, '2': 0, '3': 0 };
  list.commandCards.forEach(id => {
    const commandCard = cards[id];
    pipCounts[commandCard.cardSubtype] += 1;
  });
  cardsById.forEach(id => {
    const card = cards[id];
    if (stormTideCommands[list.mode] && stormTideCommands[list.mode].includes(id)) {
      validCommandIds.push(id);
      return;
    }
    if (card.cardType !== 'command') return;
    if (list.commandCards.includes(id)) return;
    if (list.contingencies && list.contingencies.includes(id)) return;
    if (!list.faction.includes(card.faction)) return;
    if (id === 'aa') return; // Standing Orders
    if (id === 'jl' || id === 'ka' || id === 'kb') return; // Duplicates
    if (
      pipCounts[card.cardSubtype] > 1 ||
      (card.commander && !list.commanders.includes(card.commander))
    ) {
      invalidCommandIds.push(id);
      return;
    }
    validCommandIds.push(id);
  });
  return {
    validIds: sortCommandIds(validCommandIds),
    invalidIds: sortCommandIds(invalidCommandIds)
  };
}

function getEquippableUpgrades(
  list, upgradeType, id, upgradesEquipped, additionalUpgradeSlots
) {
  const validUpgradeIds = [];
  const invalidUpgradeIds = [];
  const cardsById = Object.keys(cards);
  if (!id) return { validUpgradeIds: [], invalidUpgradeIds: [] };
  const unitCard = cards[id];
  for (let i = 0; i < cardsById.length; i++) {
    const id = cardsById[i];
    const card = cards[id];
    if (card.cardType !== 'upgrade') continue;
    if (card.cardSubtype !== upgradeType) continue;
    if (list.uniques.includes(id)) continue;
    if (upgradesEquipped.includes(id)) continue;

    // dynamically add the force affinity
    const { faction } = unitCard;

    if (faction === 'rebels' || faction === 'republic') unitCard['light side'] = true;
    else if (faction === 'separatists' || faction === 'empire') unitCard['dark side'] = true;

    if (unitCard.keywords.includes('Tempted')) {
      unitCard['light side'] = true;
      unitCard['dark side'] = true;
    }

    // dynamically add the upgrade types
    for (let j = 0; j < unitCard.upgradeBar.length; j++) {
      const upgradeType = unitCard.upgradeBar[j];
      unitCard[upgradeType] = true;
    }
    for (let j = 0; j < additionalUpgradeSlots.length; j++) {
      const upgradeType = additionalUpgradeSlots[j];
      unitCard[upgradeType] = true;
    }
    if (
      unitCard.id in interactions.eligibility &&
      interactions.eligibility[unitCard.id].conditionFunction(card)
    ) {
      const interaction = interactions.eligibility[unitCard.id];
      if (interaction.resultFunction(card)) {
        validUpgradeIds.push(id);
      }
    } else if (isRequirementsMet(card.requirements, unitCard)) {
      validUpgradeIds.push(id);
    } else {
      invalidUpgradeIds.push(id);
    }
  }
  return {
    validIds: sortIds(validUpgradeIds),
    invalidIds: sortIds(invalidUpgradeIds)
  };
}

function sortIds(ids) {
  const sortedIds = ids.sort((a, b) => {
    const cardA = cards[a];
    const cardB = cards[b];
    const nameA = cardA.displayName ? cardA.displayName : cardA.cardName;
    const nameB = cardB.displayName ? cardB.displayName : cardB.cardName;
    if (nameA > nameB) return 1;
    if (nameA < nameB) return -1;
    return 0;
  });
  return sortedIds;
}

function equipUpgrade(list, action, unitIndex, upgradeIndex, upgradeId, isApplyToAll = false) {
  if (action === 'UNIT_UPGRADE') {
    if (isApplyToAll) {
      list = equipUpgradeToAll(list, unitIndex, upgradeIndex, upgradeId);
    } else {
      list = equipUpgradeToOne(list, unitIndex, upgradeIndex, upgradeId);
    }
  } else if (action === 'COUNTERPART_UPGRADE') {
    list = equipCounterpartUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  } else if (action === 'LOADOUT_UPGRADE') {
    list = equipLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  } else if (action === 'COUNTERPART_LOADOUT_UPGRADE') {
    list = equipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex, upgradeId);
  }
  return list;
}

function unequipUpgrade(list, action, unitIndex, upgradeIndex) {
  if (action === 'UNIT_UPGRADE') {
    function unequip(list, unitIndex, upgradeIndex) {
      const unit = list.units[unitIndex];
      const upgradeId = unit.upgradesEquipped[upgradeIndex];
      const upgradeCard = cards[upgradeId];
      const newUnit = JSON.parse(JSON.stringify(unit));
      newUnit.count = 1;
      newUnit.upgradesEquipped[upgradeIndex] = null;
      if (newUnit.loadoutUpgrades && newUnit.loadoutUpgrades[upgradeIndex]) {
        newUnit.loadoutUpgrades[upgradeIndex] = null;
      }
      newUnit.unitObjectString = getUnitHash(newUnit);
      if ('additionalUpgradeSlots' in upgradeCard) {
        newUnit.additionalUpgradeSlots = [];
        newUnit.upgradesEquipped.pop();
      }
      const newUnitHashIndex = findUnitHash(list, newUnit.unitObjectString);
      if (newUnitHashIndex > -1) {
        list = incrementUnit(list, newUnitHashIndex);
      } else {
        list.units.splice(unitIndex + 1, 0, newUnit);
        list.unitObjectStrings.splice(unitIndex + 1, 0, newUnit.unitObjectString);
      }
      list = decrementUnit(list, unitIndex);
      return consolidate(list);
    }
    list = unequip(list, unitIndex, upgradeIndex);
  } else if (action === 'COUNTERPART_UPGRADE') {
    list = unequipCounterpartUpgrade(list, unitIndex, upgradeIndex);
  } else if (action === 'LOADOUT_UPGRADE') {
    list = unequipLoadoutUpgrade(list, unitIndex, upgradeIndex);
  } else if (action === 'COUNTERPART_LOADOUT_UPGRADE') {
    list = unequipCounterpartLoadoutUpgrade(list, unitIndex, upgradeIndex);
  }
  return list;
}

function processUnitSegment(segment) {
  const unitSegment = segment.slice(0, 3);
  let loadoutSegment; let upgradeSegment = segment.slice(3);
  if (upgradeSegment.includes('_')) {
    loadoutSegment = upgradeSegment.split('_')[1];
    upgradeSegment = upgradeSegment.split('_')[0]
  }
  const unitCount = Number.parseInt(unitSegment.charAt(0));
  const unitId = unitSegment.charAt(1) + unitSegment.charAt(2);
  const unitCard = cards[unitId];
  const newUnit = {
    unitId,
    count: unitCount,
    hasUniques: unitCard.isUnique,
    totalUnitCost: unitCard.cost * unitCount,
    unitObjectString: unitId,
    upgradesEquipped: [],
    loadoutUpgrades: [],
    additionalUpgradeSlots: []
  };
  let upgradeIndex = 0;
  for (let i = 0; i < upgradeSegment.length; i++) {
    if (upgradeSegment.charAt(i) === '0') {
      newUnit.upgradesEquipped[upgradeIndex] = null;
      upgradeIndex++;
    } else {
      const upgradeId = upgradeSegment.charAt(i) + upgradeSegment.charAt(i + 1);
      const upgradeCard = cards[upgradeId];
      newUnit.upgradesEquipped[upgradeIndex] = upgradeId;
      newUnit.unitObjectString += upgradeId;
      if ('additionalUpgradeSlots' in upgradeCard) {
        newUnit.additionalUpgradeSlots = [upgradeCard.additionalUpgradeSlots[0]];
        newUnit.upgradesEquipped.push(null);
      }
      i++;
      upgradeIndex++;
    }
  }
  let loadoutIndex = 0;
  for (let i = 0; loadoutSegment && i < loadoutSegment.length; i++) {
    if (loadoutSegment.charAt(i) === '0') {
      newUnit.loadoutUpgrades[loadoutIndex] = null;
      loadoutIndex++;
    } else {
      const upgradeId = loadoutSegment.charAt(i) + loadoutSegment.charAt(i + 1);
      newUnit.loadoutUpgrades[loadoutIndex] = upgradeId;
      // const upgradeCard = cards[upgradeId];
      // if ('additionalUpgradeSlots' in upgradeCard) {
      //   newUnit.additionalUpgradeSlots = [upgradeCard.additionalUpgradeSlots[0]];
      //   newUnit.loadoutUpgrades.push(null);
      // }
      i++;
      loadoutIndex++;
    }
  }
  return newUnit;
}

function segmentToUnitObject(unitIndex, segment) {
  let unit; let counterpart;
  if (segment.includes('+')) {
    unit = processUnitSegment(segment.split('+')[0]);
    counterpart = processUnitSegment(segment.split('+')[1]);
    const {
      unitId,
      hasUniques,
      totalUnitCost,
      unitObjectString,
      upgradesEquipped,
      loadoutUpgrades,
      additionalUpgradeSlots
    } = counterpart;
    unit.counterpart = {
      count: 1,
      counterpartId: unitId,
      hasUniques,
      totalUnitCost,
      unitObjectString,
      upgradesEquipped,
      loadoutUpgrades,
      additionalUpgradeSlots
    };
  } else unit = processUnitSegment(segment);
  return unit;
}

function convertHashToList(faction, url) {
  let list = JSON.parse(JSON.stringify(listTemplate));
  list.faction = faction;
  list.contingencies = [];
  const segments = url.split(',');
  const unitSegments = [];
  const otherSegments = [];
  try {
    let oldCounterparts = ['lw', 'ji', 'jj'];
    segments.forEach(segment => {
      let hasOldCounterpart = false;
      oldCounterparts.forEach(id => {
        if (segment === `1${id}`) hasOldCounterpart = true;
      });
      if (hasOldCounterpart) return;
      else if (segment.length > 2) unitSegments.push(segment);
      else otherSegments.push(segment);
    });
  } catch (e) {
    return false;
  }
  try {
    list.units = unitSegments.map((segment, i) => segmentToUnitObject(i, segment));
    list.units.forEach(unit => {
      list.unitObjectStrings.push(unit.unitObjectString);
    });
  } catch (e) {
    return false;
  }
  try {
    let commandCardSlots = 7;
    otherSegments.forEach(cardId => {
      commandCardSlots -=1;
      if (cardId === '') return;
      // if (cardId.includes('*')) {}
      const card = cards[cardId];
      if (card.cardType === 'command') {
        if (commandCardSlots > 0) list.commandCards.push(cardId);
        else list.contingencies.push(cardId);
      } else if (card.cardSubtype === 'objective') {
        list.objectiveCards.push(cardId);
      } else if (card.cardSubtype === 'deployment') {
        list.deploymentCards.push(cardId);
      } else if (card.cardSubtype === 'condition') {
        list.conditionCards.push(cardId);
      }
    });
  } catch (e) {
    // console.log(e);
    return false;
  }
  return consolidate(list);
}

function mergeLists(primaryList, secondaryList) {
  let unitsToAdd = [];
  for (let i = 0; i < secondaryList.units.length; i++) {
    const unit = secondaryList.units[i];
    if (unit.hasUniques) {
      if (primaryList.uniques.includes(unit.unitId)) continue;
      let isValid = true;
      unit.upgradesEquipped.forEach(upgradeId => {
        if (upgradeId && primaryList.uniques.includes(upgradeId)) isValid = false;
      });
      if (!isValid) continue;
      unitsToAdd.push(unit);
    } else if (primaryList.unitObjectStrings.includes(unit.unitObjectString)) {
      primaryList.units[i].count += unit.count;
    } else {
      unitsToAdd.push(unit);
    }
  }
  unitsToAdd.forEach(unitToAdd => primaryList.units.push(unitToAdd));
  return consolidate(primaryList);
}

export {
  rehashList,
  convertHashToList,
  changeListTitle,
  // toggleListMode,
  setListMode,
  addUnit,
  addCounterpart,
  removeCounterpart,
  addBattle,
  removeBattle,
  addCommand,
  addContingency,
  removeContingency,
  removeCommand,
  equipUpgrade,
  unequipUpgrade,
  equipCounterpartUpgrade,
  unequipCounterpartUpgrade,
  equipLoadoutUpgrade,
  unequipLoadoutUpgrade,
  equipCounterpartLoadoutUpgrade,
  unequipCounterpartLoadoutUpgrade,
  incrementUnit,
  decrementUnit,
  mergeLists,
  getEligibleBattlesToAdd,
  getEligibleCommandsToAdd,
  getEligibleContingenciesToAdd,
  getEligibleUnitsToAdd,
  getEquippableUpgrades,
  getEquippableLoadoutUpgrades,
  generateTTSJSONText,
  generateTournamentText,
  generateStandardText,
  generateMinimalText
};
