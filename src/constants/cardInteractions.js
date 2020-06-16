import cards from './cards';

function checkUpgradeName(upgrade, value) {
  return upgrade.cardName.includes(value);
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
      resultFunction: (upgrade) => checkUpgradeName(upgrade, 'Electrobinoculars')
    }
  }
};

export default interactions
