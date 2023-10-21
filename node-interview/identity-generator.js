const genders = [
  {
    gender: 'M',
    names: [
      'Johnny',
      'Tom',
      'Yaroslav',
      'Włodzimierz',
      'Trevor',
      'Jaskier',
      'Geralt',
      'Andrew',
    ],
  },
  {
    gender: 'F',
    names: [
      'Ethel',
      'Lucy',
      'Kate',
      'Panam',
      'Elizabeth',
      'Carla',
      'Maria',
      'Nathalie',
    ],
  },
];

const lastNames = [
  'Katchynsky',
  'Smith',
  'Dziędziel',
  'Trump',
  'Nocnik',
  'Bidon',
  'Podsiadło',
  'Nadsiadło',
  'T-Rex',
];

const getGenderAndName = value => {
  const gender = genders[value % genders.length];
  const person = {
    gender: gender.gender,
    name: gender.names[value % gender.names.length],
  };

  return person;
}

const createPersonWithFullData = () => {
  const randomValue = parseInt(Math.random() * 100);
  
  const person = getGenderAndName(randomValue);
  person.lastName = lastNames[randomValue % lastNames.length];
  person.age = (randomValue + 18) % 78;

  return person;
}

const data = [];
while (data.length < 20) {
  data.push(createPersonWithFullData());
}

const jsonData = JSON.stringify(data);

const fs = require('fs');

fs.writeFile('people.json', jsonData, (err) => {
  if (err) {
    throw err;
  }
  console.log('Successfully saved file!');
});