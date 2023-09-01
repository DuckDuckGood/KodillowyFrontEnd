import { isBookable } from './booking-helpers.js';

export class BookedObjects {
  constructor() {
    this.booked = {};
  }
  makeBookedManyObjects(objects) {
    if (objects) {
      this.booked.eventsNotRepeat = {};
      this.bookEventsNotRepeat(objects.eventsNotRepeat);

      this.booked.eventsRepeat = objects.eventsRepeat;
    }
  }

  book(objects) {
    console.log(objects);
    Object.entries(objects).forEach(object => {
      const [key, value] = object;
      if (!this.booked[key]) {
        this.booked[key] = {};
      }
      Object.values(value).forEach(toBook => {
        this.bookInBase(this.booked[key], toBook);
        this.bookInBase(this.booked.bookings, toBook);
      })
    });
  }

  bookInBase(base, toBook) {
    if (base && isBookable(toBook)) {
      if (!base[toBook.date]) {
        base[toBook.date] = {};
      }
      if (!base[toBook.date][toBook.hour]) {
        base[toBook.date][toBook.hour] = [];
      }
      if (!base[toBook.date][toBook.hour].some(table => table === toBook.table)) {
        base[toBook.date][toBook.hour].push(toBook.table);
      }
    }
  }

  couldBook(booking) {
    if (isBookable(booking)) {
      const base = this.booked.bookings;

      if (Object.values(this.booked.eventsRepeat).some(booked => booked.hour === booking.hour && booked.table === booking.table)) {
        return false;
      }

      return !base[booking.date] || !base[booking.date][booking.hour] || !base[booking.date][booking.hour].some(table => table === booking.table);
    }
    return false;
  }

  getNextBookingId() {
    return Object.keys(this.booked.bookings).length;
  }
}