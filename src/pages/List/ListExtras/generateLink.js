import urls from 'constants/urls';

function generateLink(list) {
  const urlStrings = [];
  list.units.forEach(unit => {
    let urlString = `${unit.count}${unit.unitId}`;
    unit.upgradesEquipped.forEach((upgradeId, i) => {
      urlString += upgradeId ? upgradeId : '0';
    });
    if (unit.loadoutUpgrades && unit.loadoutUpgrades.length > 0) {
      urlString += '_';
      unit.loadoutUpgrades.forEach((upgradeId, i) => {
        urlString += unit.loadoutUpgrades[i] ? `${unit.loadoutUpgrades[i]}` : '0';
      });
    }
    if (unit.counterpart) {
      const { counterpart } = unit;
      urlString += `+1${counterpart.counterpartId}`;
      counterpart.upgradesEquipped.forEach((upgradeId, i) => {
        urlString += upgradeId ? upgradeId : '0';
      });
      if (counterpart.loadoutUpgrades && counterpart.loadoutUpgrades.length > 0) {
        urlString += '_';
        counterpart.loadoutUpgrades.forEach((upgradeId, i) => {
          urlString += counterpart.loadoutUpgrades[i] ? counterpart.loadoutUpgrades[i] : '0';
        });
      }
    }
    urlStrings.push(urlString);
  });
  list.commandCards.forEach(commandId => urlStrings.push(commandId));
  list.objectiveCards.forEach(objectiveId => urlStrings.push(objectiveId));
  list.deploymentCards.forEach(deploymentId => urlStrings.push(deploymentId));
  list.conditionCards.forEach(conditionId => urlStrings.push(conditionId));
  return `${urls.listPath}/${list.faction}/${urlStrings.join(',')}`;
}

export default generateLink;
