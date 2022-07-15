const battleForcesDict = {
  'Echo Base Defenders': {
      name: 'Echo Base Defenders',
      commander: ['ab', 'ad', 'ac', 'bi'],
      operative: ['jg', 'ji', 'af'],
      corps: ['gv', 'if'],
      special: [],
      support: ['an', 'he'],
      heavy: ['ap'],
      allowedUniqueUpgrades: ['fk'],
      'standard mode': {
        commander: [1, 4],
        operative: [0, 3],
        corps: [3, 6],
        special: [0, 0],
        support: [1, 4],
        heavy: [0, 2]
      },
      '500-point mode': {
        commander: [1, 3],
        operative: [0, 2],
        corps: [2, 4],
        special: [0, 0],
        support: [1, 3],
        heavy: [0,1]
      }
    },
  'Blizzard Force': {
      name: 'Blizzard Force',
      commander: ['at', 'au', 'ar'],
      operative: ['fn'],
      corps: ['az', 'sr'],
      special: [],
      support: ['bf', 'be'],
      heavy: ['bg'],
      allowedUniqueUpgrades: ['fl'],
      'standard mode': {
        commander: [1, 2],
        operative: [0, 2],
        corps: [3, 6],
        special: [0, 0],
        support: [1, 4],
        heavy: [0, 2]
      },
      '500-point mode': {
        commander: [1, 2],
        operative: [0, 1],
        corps: [2, 4],
        special: [0, 0],
        support: [1, 3],
        heavy: [0, 1]
      }
    },
  '501st Legion': {
      name: '501st Legion',
      commander: ['na', 'fy', 'ns'],
      operative: [],
      corps: ['fz'],
      special: ['kz', 'ky'],
      support: ['mb', 'ic'],
      heavy: ['oo'],
      allowedUniqueUpgrades: ['lh', 'lg'],
      'standard mode': {
        commander: [1, 2],
        operative: [0, 1],
        corps: [1, 4],
        special: [1, 4],
        support: [1, 2],
        heavy: [0, 1]
      },
      '500-point mode': {
        commander: [1, 1],
        operative: [0, 1],
        corps: [1, 4],
        special: [0, 0],
        support: [1, 2],
        heavy: [0, 1]
      }
    },
  'Separatist Invasion': {
      name: 'Separatist Invasion',
      commander: ['fx', 'ia', 'nr'],
      operative: ['nb'],
      corps: ['gx'],
      special: ['px'],
      support: ['ie', 'mc'],
      heavy: ['gc'],
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
        heavy: [0, 1]
      }
    },
  'Shadow Collective': {
      name: 'Shadow Collective',
      commander: ['ra', 'rd', 'qy'],
      operative: ['rc', 'kx', 'ax'],
      corps: ['rb', 'qz'],
      special: ['re'],
      support: ['sq'],
      heavy: ['sm'],
      allowedUniqueUpgrades: ['rq', 'so', 'se', 'sp', 'sg', 'sh', 'si'],
      'standard mode': {
        commander: [1, 4],
        operative: [0, 3],
        corps: [2, 6],
        special: [0, 4],
        support: [0, 2],
        heavy: [0, 2]
      },
      '500-point mode': {
        commander: [1, 2],
        operative: [0, 1],
        corps: [1, 4],
        special: [0, 3],
        support: [0, 2],
        heavy: [0, 1]
      }
    }
};

export default battleForcesDict;
