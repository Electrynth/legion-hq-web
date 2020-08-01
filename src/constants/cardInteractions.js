import cards from './cards';

function checkUpgradeName(upgrade, values) {
  if (Array.isArray(values)) {
    let isConditionMet = false;
    values.forEach(value => {
      if (upgrade.cardName.includes(value)) isConditionMet = true;
    });
    return isConditionMet;
  } else {
    return upgrade.cardName.includes(values);
  }
}

function checkUpgradeType(upgrade, value) {
  return upgrade.cardSubtype === value;
}

const interactions = {
  entourages: {
    bc: {
      // IRGs + Emperor Palpatine
      isConditionMet: (list, unit) => list.uniques.includes('as'),
      boundaryDelta: 1
    },
    bd: {
      // IDTs + Director Krennic
      isConditionMet: (list, unit) => list.uniques.includes('av'),
      boundaryDelta: 1
    }
  },
  upgradePoints: {
    lk: {
      // JT-12 Jetpack + Captain Rex
      isConditionMet: (list, unit) => unit.unitId === 'fy',
      pointDelta: -5
    },
    lu: {
      // Jyn's Blaster + Jyn Erso
      isConditionMet: (list, unit) => list.uniques.includes('ae'),
      pointDelta: -5
    },
    li: {
      // Situational Awareness + support unit
      isConditionMet: (list, unit) => cards[unit.unitId].rank === 'support',
      pointDelta: 4
    }
  },
  eligibility: {
    gx: {
      // B1 Battle droids + Electrobinoculars
      conditionFunction: (upgrade) => checkUpgradeType(upgrade, 'gear'),
      resultFunction: (upgrade) => checkUpgradeName(upgrade, ['Electrobinoculars', 'Portable Scanner'])
    }
  }
};

export default interactions
