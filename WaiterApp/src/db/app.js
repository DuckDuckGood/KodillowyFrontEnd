const db = {
  "tables": [
    {
      "id": 1,
      "status": "Reserved",
      "seats": 4,
      "occupiedSeats": "5",
      "bill": 0
    },
    {
      "id": 2,
      "status": "Free",
      "seats": 4,
      "occupiedSeats": "5",
      "bill": 0
    },
    {
      "id": 3,
      "status": "Busy",
      "seats": 4,
      "occupiedSeats": "5",
      "bill": 0
    },
    {
      "id": 4,
      "status": "Cleaning",
      "seats": 4,
      "occupiedSeats": "5",
      "bill": 0
    }
  ],
  "statuses": [
    "Reserved",
    "Free",
    "Busy",
    "Cleaning"
  ]
};

module.exports = { db, ...module.exports };