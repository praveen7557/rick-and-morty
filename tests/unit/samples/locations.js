export const locations = {
  info: {
    count: 30,
    pages: 6,
    next: 'https://rickandmortyapi.com/api/location?page=2',
    prev: null
  },
  results: [
    {
      id: 1,
      name: 'Earth (C-137)',
      type: 'Planet',
      dimension: 'Dimension C-137',
      residents: [
        'https://rickandmortyapi.com/api/character/38',
        'https://rickandmortyapi.com/api/character/45',
        'https://rickandmortyapi.com/api/character/71'
      ],
      url: 'https://rickandmortyapi.com/api/location/1',
      created: '2017-11-10T12:42:04.162Z'
    },
    {
      id: 2,
      name: 'Abadango',
      type: 'Cluster',
      dimension: 'unknown',
      residents: ['https://rickandmortyapi.com/api/character/6'],
      url: 'https://rickandmortyapi.com/api/location/2',
      created: '2017-11-10T13:06:38.182Z'
    },
    {
      id: 3,
      name: 'Citadel of Ricks',
      type: 'Space station',
      dimension: 'unknown',
      residents: [
        'https://rickandmortyapi.com/api/character/8',
        'https://rickandmortyapi.com/api/character/14',
        'https://rickandmortyapi.com/api/character/15'
      ],
      url: 'https://rickandmortyapi.com/api/location/3',
      created: '2017-11-10T13:08:13.191Z'
    },
    {
      id: 4,
      name: "Worldender's lair",
      type: 'Planet',
      dimension: 'unknown',
      residents: ['https://rickandmortyapi.com/api/character/10'],
      url: 'https://rickandmortyapi.com/api/location/4',
      created: '2017-11-10T13:08:20.569Z'
    },
    {
      id: 5,
      name: 'Anatomy Park',
      type: 'Microverse',
      dimension: 'Dimension C-137',
      residents: [],
      url: 'https://rickandmortyapi.com/api/location/5',
      created: '2017-11-10T13:08:46.060Z'
    }
  ]
}
