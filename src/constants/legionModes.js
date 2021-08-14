const legionModes = {
  '500-point mode': {
    name: 'Skirmish Format',
    maxPoints: 500,
    unitCounts: {
      commander: [1, 1],
      operative: [0, 1],
      corps: [2, 4],
      special: [0, 2],
      support: [0, 2],
      heavy: [0, 1]
    }
  },
  'standard mode': {
    name: 'Standard Format',
    maxPoints: 800,
    unitCounts: {
      commander: [1, 2],
      operative: [0, 2],
      corps: [3, 6],
      special: [0, 3],
      support: [0, 3],
      heavy: [0, 2]
    }
  },
  'grand army mode': {
    name: 'Grand Army Format',
    maxPoints: 1600,
    unitCounts: {
      commander: [1, 4],
      operative: [0, 3],
      corps: [6, 10],
      special: [0, 5],
      support: [0, 5],
      heavy: [0, 4]
    }
  },
  'storm tide: infantry': {
    name: 'Storm Tide: Infantry Division',
    maxPoints: 1200,
    unitCounts: {
      commander: [1, 3],
      operative: [0, 1],
      corps: [3, 7],
      special: [0, 3],
      support: [0, 4],
      heavy: [0, 2]
    }
  },
  'storm tide: armored': {
    name: 'Storm Tide: Armored Division',
    maxPoints: 1200,
    unitCounts: {
      commander: [1, 3],
      operative: [0, 1],
      corps: [3, 6],
      special: [0, 2],
      support: [0, 3],
      heavy: [0, 4]
    }
  },
  'storm tide: special forces': {
    name: 'Storm Tide: Special Forces Division',
    maxPoints: 1200,
    unitCounts: {
      commander: [1, 3],
      operative: [0, 2],
      corps: [3, 6],
      special: [0, 5],
      support: [0, 2],
      heavy: [0, 2]
    }
  }
};

export default legionModes;
