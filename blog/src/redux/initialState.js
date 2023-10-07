export const initialState = {
  categories: [
    'Movies',
    'Books',
    'Games',
  ],
  posts: [
    {
      id: 1,
      title: 'Artykuł Lambda',
      author: 'Ted the Caveman',
      published: '24.09.2023',
      content: 'Nieco przydługi artykuł o tym, jak pewien pan innemu panu nabrudził',
      shortDescription: 'Ło Panie, a kto tu Panu tak na....',
      category: 'Movies',
    },
    {
      id: 2,
      title: 'Afera Masłowa',
      author: 'Dorota Wellman',
      published: '20.10.2023',
      content: '"Ludzie, masło oszalało!" - Hymel Jadwiga',
      shortDescription: 'Masło znów się awanturuje',
      category: 'Books',
    },
    {
      id: 3,
      title: '1-800 Oświecenie',
      author: 'Taco Hemingway',
      published: '21.09.2023',
      content: 'Parapapapa',
      shortDescription: 'Nowa płyta Taco całkiem nieźle siada',
      category: 'Games',
    },
  ],
};