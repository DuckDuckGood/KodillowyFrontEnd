const db = {
  concerts: [
    { 
      id: 1, 
      performer: 'John Doe', 
      genre: 'Rock', 
      price: 25, 
      day: 1, 
      image: '/img/uploads/1fsd324fsdg.jpg' 
    },
    { 
      id: 2, 
      performer: 'Rebekah Parker', 
      genre: 'R&B', 
      price: 25, 
      day: 1, 
      image: '/img/uploads/2f342s4fsdg.jpg' 
    },
    { 
      id: 3, 
      performer: 'Maybell Haley', 
      genre: 'Pop', 
      price: 40, 
      day: 1, 
      image: '/img/uploads/hdfh42sd213.jpg' 
    },
  ],
  testimonials: [
    {
      id: 1,
      author: 'Shrek',
      text: 'Go away from my swamp!',
    },
    {
      id: 2,
      author: 'Michael Scott',
      text: 'That\'s what she said',
    }
  ],
};

module.exports = db;