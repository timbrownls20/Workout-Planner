const bodyPartDataRaw = [
  {
    id: 1,
    name: "deltoids",
    area: {
      id: 6,
      name: "shoulder",
    },
  },
  {
    id: 2,
    name: "biceps",
    area: {
      id: 1,
      name: "arms",
    },
  },
  {
    id: 3,
    name: "triceps",
    area: {
      id: 1,
      name: "arms",
    },
  },
  {
    id: 4,
    name: "forearms",
    area: {
      id: 1,
      name: "arms",
    },
  },
  {
    id: 5,
    name: "pecs",
    area: {
      id: 2,
      name: "chest",
    },
  },
  {
    id: 6,
    name: "abomdinals",
    area: {
      id: 4,
      name: "core",
    },
  },
  {
    id: 7,
    name: "obliques",
    area: {
      id: 4,
      name: "core",
    },
  },
  {
    id: 8,
    name: "lats",
    area: {
      id: 3,
      name: "back",
    },
  },
  {
    id: 9,
    name: "glutes",
    area: {
      id: 5,
      name: "legs",
    },
  },
  {
    id: 10,
    name: "hamstrings",
    area: {
      id: 5,
      name: "legs",
    },
  },
  {
    id: 11,
    name: "quads",
    area: {
      id: 5,
      name: "legs",
    },
  },
  {
    id: 12,
    name: "calves",
    area: {
      id: 5,
      name: "legs",
    },
  },
  {
    id: 13,
    name: "lower",
    area: {
      id: 3,
      name: "back",
    },
  },
  {
    id: 14,
    name: "traps",
    area: {
      id: 6,
      name: "shoulder",
    },
  },
  {
    id: 15,
    name: "hip flexors",
    area: {
      id: 4,
      name: "core",
    },
  },
  {
    id: 16,
    name: "rear delts",
    area: {
      id: 6,
      name: "shoulder",
    },
  },
];

const bodyPartSort = (a, b) => {
  if (a.area.id > b.area.id) {
    return 1;
  } else if (a.area.id < b.area.id) {
    return -1;
  } else if (a.area.id === b.area.id) {
    return 0;
  }
};

const bodyPartData = bodyPartDataRaw.sort(bodyPartSort);

const bodyPartAreas = bodyPartData.reduce((acc, curr) => {
  if (!acc.find(element => element.id === curr.area.id)) acc.push(curr.area);
  return acc;
}, []);

export { bodyPartData, bodyPartAreas };
