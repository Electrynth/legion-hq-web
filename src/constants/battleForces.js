const battleForces = {
  rebels: [
    {
      name: 'Echo Base Defenders',
      commander: ['ab', 'ad', 'ac', 'bi'],
      operative: ['jg', 'ji', 'af'],
      corps: ['gv', 'ha', 'if'],
      special: [],
      support: ['an', 'he'],
      heavy: ['ap'],
      allowedUniqueUpgrades: ['fk']
    }
  ],
  empire: [
    {
      name: 'Blizzard Force',
      commander: ['at', 'au', 'ar'],
      operative: ['fn'],
      corps: ['az', 'sr'],
      special: [],
      support: ['bf', 'be'],
      heavy: ['bg'],
      allowedUniqueUpgrades: ['fl']
    }
  ],
  republic: [
    {
      name: '501st Legion',
      commander: ['na', 'fy', 'ns'],
      operative: [],
      corps: ['fz'],
      special: ['kz', 'ky'],
      support: ['mb', 'ic'],
      heavy: ['oo'],
      allowedUniqueUpgrades: ['lh', 'lg']
    }
  ],
  separatists: [
    {
      name: 'Separatist Invasion',
      commander: ['fx', 'ia', 'nr'],
      operative: ['nb'],
      corps: ['gx'],
      special: ['px'],
      support: ['ie', 'mc'],
      heavy: ['gc'],
      allowedUniqueUpgrades: ['il']
    }
  ],
  fringe: [
    {
      name: 'Shadow Collective',
      commander: ['ra', 'rd', 'qy'],
      operative: ['rc', 'kx', 'ax'],
      corps: ['rb', 'qz'],
      special: ['re'],
      support: ['sq'],
      heavy: ['om'],
      allowedUniqueUpgrades: ['rq', 'so', 'se', 'sp', 'sg', 'sh', 'si']
    }
  ]
};

export default battleForces;
