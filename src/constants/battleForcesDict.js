const battleForcesDict = {
  'Echo Base Defenders': {
      name: 'Echo Base Defenders',
      faction: 'rebels',
      commander: ['ab', 'ad', 'ac', 'bi'],
      operative: ['jg', 'ji', 'af'],
      corps: ['gv', 'if'],
      special: [],
      support: ['an', 'he'],
      heavy: ['ap'],
      allowedUniqueUpgrades: ['fk'],
      ruleUrl: 'https://atomicmassgames.com/s/Star-Wars-Legion-BF-Rules-Sheet-EBD.pdf',
      'standard mode': {
        commander: [1, 4],
        operative: [0, 3],
        corps: [3, 6],
        special: [0, 0],
        support: [1, 4],
        heavy: [0, 2],
        commOp: 4
      },
      '500-point mode': {
        commander: [1, 3],
        operative: [0, 2],
        corps: [2, 4],
        special: [0, 0],
        support: [1, 3],
        heavy: [0, 1],
        commOp: 3
      }
    },
    'Bright Tree Village': {
      name: 'Bright Tree Village',
      commander: ['vv', 'ac', 'ab', 've', 'wd'],
      operative: ['af'],
      corps: ['vk', 'ah'],
      special: ['vu', 'ak'],
      support: [],
      heavy: ['vj'],
      allowedUniqueUpgrades: ['vq', 'wa', 'wb', 'wc'],
      ruleUrl: 'https://static1.squarespace.com/static/5ce432b1f9d2be000134d8ae/t/6480bd67c7a4c84f6c1bf2af/1686158697261/Star+Wars+Legion+BF+Rules+Sheet+Bright+Tree+Village+%281%29.pdf',
      'standard mode': {
        commander: [1, 5],
        operative: [0, 4],
        corps: [3, 6],
        special: [0, 3],
        support: [0, 2],
        heavy: [0, 2]
      },
      '500-point mode': {
        commander: [1, 4],
        operative: [0, 3],
        corps: [2, 4],
        special: [0, 3],
        support: [0, 1],
        heavy: [0, 1]
      }
    },
  'Blizzard Force': {
      name: 'Blizzard Force',
      faction: 'empire',
      commander: ['at', 'au', 'ar'],
      operative: [],
      corps: ['ay', 'az', 'sr'],
      special: [],
      support: ['bf', 'be'],
      heavy: ['bg'],
      ruleUrl: 'https://atomicmassgames.com/s/Star-Wars-Legion-BF-Rules-Sheet-BF.pdf',
      allowedUniqueUpgrades: ['fl'],
      'standard mode': {
        commander: [1, 2],
        operative: [0, 0],
        corps: [3, 6],
        special: [0, 0],
        support: [1, 4],
        heavy: [0, 2]
      },
      '500-point mode': {
        commander: [1, 2],
        operative: [0, 0],
        corps: [2, 4],
        special: [0, 0],
        support: [1, 3],
        heavy: [0, 1]
      }
    },
  'Imperial Remnant': {
    name: 'Imperial Remnant',
    faction: 'empire',
    commander: ['ui', 'ar'],
    operative: [],
    corps: ['ay', 'hg', 'uy', 'uz'],
    special: [],
    support: ['bf', 'be'],
    heavy: ['tm'],
    ruleUrl: 'https://www.atomicmassgames.com/s/Imperial-Remnant-Rules-Sheet.pdf',
    allowedUniqueUpgrades: ['uj', 'gm'],
    'standard mode': {
      commander: [1, 2],
      operative: [0, 1],
      corps: [3, 6],
      special: [0, 0],
      support: [0, 2],
      heavy: [0, 2],
      commOp: 2
    },
    '500-point mode': {
      commander: [1, 2],
      operative: [0, 1],
      corps: [2, 4],
      special: [0, 0],
      support: [0, 1],
      heavy: [0, 1],
      commOp: 2
    }
  },
  '501st Legion': {
      name: '501st Legion',
      faction: 'republic',
      commander: ['na', 'fy', 'ns'],
      operative: [],
      corps: ['fz'],
      special: ['kz', 'ky'],
      support: ['mb', 'ic'],
      heavy: ['oo'],
      ruleUrl: 'https://atomicmassgames.com/s/Star-Wars-Legion-BF-Rules-Sheet-501.pdf',
      allowedUniqueUpgrades: ['lh', 'lg'],
      'standard mode': {
        commander: [1, 2],
        operative: [0, 1],
        corps: [1, 4],
        special: [1, 4],
        support: [1, 2],
        heavy: [0, 1],
        commOp: 2
      },
      '500-point mode': {
        commander: [1, 1],
        operative: [0, 1],
        corps: [1, 4],
        special: [1, 4],
        support: [0, 2],
        heavy: [0, 1]
      }
    },
  'Separatist Invasion': {
      name: 'Separatist Invasion',
      faction: 'separatists',
      commander: ['fx', 'ia', 'nr'],
      operative: ['nb'],
      corps: ['gx'],
      special: ['px'],
      support: ['ie', 'mc'],
      heavy: ['gc'],
      ruleUrl: 'https://atomicmassgames.com/s/Star-Wars-Legion-BF-Rules-Sheet-SI.pdf',
      allowedUniqueUpgrades: ['il'],
      'standard mode': {
        commander: [1, 1],
        operative: [0, 1],
        corps: [4, 8],
        special: [0, 2],
        support: [0, 3],
        heavy: [1, 2]
      },
      '500-point mode': {
        commander: [1, 1],
        operative: [0, 1],
        corps: [2, 6],
        special: [0, 1],
        support: [0, 2],
        heavy: [1, 1]
      }
    },
  'Shadow Collective': {
      name: 'Shadow Collective',
      faction: 'fringe',
      countsMercsForMin: true,
      commander: ['ra', 'rd', 'qy'],
      operative: ['rc', 'kx', 'ax'],
      corps: ['rb', 'qz'],
      special: ['re'],
      support: ['sq'],
      heavy: ['sm'],
      ruleUrl: 'https://atomicmassgames.com/s/Star-Wars-Legion-BF-Rules-Sheet-SC.pdf',
      allowedUniqueUpgrades: ['rq', 'so', 'se', 'sp', 'sg', 'sh', 'si'],
      'standard mode': {
        commander: [1, 4],
        operative: [0, 3],
        corps: [2, 6],
        special: [0, 4],
        support: [0, 3],
        heavy: [0, 2],
        commOp: 4
      },
      '500-point mode': {
        commander: [1, 2],
        operative: [0, 1],
        corps: [1, 4],
        special: [0, 3],
        support: [0, 2],
        heavy: [0, 1],
        commOp: 2
      }
    }
};

export default battleForcesDict;
