import { AmountWidget } from './amount-widget.js';
import { connectionSettings, jsonResponses, parseDate, select, templates } from '../helpers.js';
import { DatePicker } from './DatePicker.js';
import { HourPicker } from './HourPicker.js';
import { BookedObjects } from './booked-objects.js';
import { classNames } from '../helpers.js';

/* global Handlebars, utils, dataSource, require */ // eslint-disable-line no-unused-vars

export class Booking {
  constructor(element) {
    this.render(element);
    this.initWidgets();
    this.getData();
  }
  
  getData() {
    this.fetchMinDate = connectionSettings.db.dateStartParamKey + '=' + parseDate(this.datePicker.minDate);
    this.fetchMaxDate = connectionSettings.db.dateEndParamKey + '=' + parseDate(this.datePicker.maxDate);

    const params = {
      bookings: [
        this.fetchMinDate,
        this.fetchMaxDate,
      ],
      eventsNotRepeat: [
        connectionSettings.db.notRepeatParam,
        this.fetchMinDate,
        this.fetchMaxDate,
      ],
      eventsRepeat: [
        connectionSettings.db.repeatParam,
        this.fetchMaxDate,
      ],
    }

    this.urls = {
      bookings:       connectionSettings.db.url + '/' + connectionSettings.db.bookings   + '?' + params.bookings.join('&'),
      eventsNotRepeat:  connectionSettings.db.url + '/' + connectionSettings.db.events     + '?' + params.eventsNotRepeat.join('&'),
      eventsRepeat:   connectionSettings.db.url + '/' + connectionSettings.db.events     + '?' + params.eventsRepeat.join('&'),
    };
    
    this.fetchBookedObjects();
  }

  fetchBookedObjects() {
    const iterable = [];
    const toBook = {};
    this.bookedObjects = new BookedObjects();


    Object.values(this.urls).forEach(url => iterable.push(fetch(url)));

    Promise.all(iterable)
      .then((allResponses) => {
        Promise.all(jsonResponses(allResponses))
          .then(jsonResponses => {
            for(let i=0; i<jsonResponses.length; i++) {
              toBook[Object.keys(this.urls)[i]] = jsonResponses[i];
            }
          })
          .then(() => this.bookedObjects.book(toBook));
      })
      .then(() => this.hourPicker.addBookedObjects(this.bookedObjects));
  }

  render(element) {
    this.dom = {};
    this.dom.wrapper = element;
    this.dom.wrapper.innerHTML = templates.bookingWidget();

    this.dom.peopleAmount = this.dom.wrapper.querySelector(select.booking.peopleAmount);
    this.dom.hoursAmount = this.dom.wrapper.querySelector(select.booking.hoursAmount);
    this.dom.datePicker = this.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    this.dom.hourPicker = this.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
    this.dom.bookingButton = this.dom.wrapper.querySelector(select.booking.bookingButton);
    this.dom.tables = this.dom.wrapper.querySelectorAll(select.booking.tables);

    Object.values(this.dom.tables).forEach(table => table.addEventListener('click', e => this._selectedTable(e)));
    this.dom.datePicker.addEventListener('change', () => this.getData());
    this.dom.bookingButton.addEventListener('click', e => this._tryBookTable(e));
  }

  peopleWidgetHandler(e) { // eslint-disable-line no-unused-vars
    //this._handleAmount(this.peopleAmount, e);
  }

  hoursWidgetHandler(e) { // eslint-disable-line no-unused-vars
    //this._handleAmount(this.hoursAmount, e);
  }

  _handleAmount(widget, e) {
    let target = e.target;
    while (!target.classList.contains('btn-quantity')) {
      target = target.parentNode;
    }
    const option = target.getAttribute('href');
    if (!widget.value) {
      widget.setValue(1);
    }

    if (option === '#less') {
      widget.setValue(parseInt(widget.value) - 1);
    }

    if (option === '#more') {
      widget.setValue(parseInt(widget.value) + 1);
    }
  }

  initWidgets() {
    this.peopleAmount = new AmountWidget(this.dom.peopleAmount);
    this.dom.peopleAmount.addEventListener('click', e => this.peopleWidgetHandler(e));

    this.hoursAmount = new AmountWidget(this.dom.hoursAmount);
    this.dom.hoursAmount.addEventListener('click', e => this.hoursWidgetHandler(e));

    this.datePicker = new DatePicker(this.dom.datePicker);
    this.hourPicker = new HourPicker(this.dom.hourPicker);
    this.hourPicker.addDatePicker(this.datePicker);
    this.hourPicker.addTablesDom(this.dom.tables);
  }

  _tryBookTable(e) {
    e.preventDefault();
    const bookingStarters = [];
    
    const booking = {
      date: this.datePicker.getParsedDate(),
      duration: 1,
      hour: `${this.hourPicker.correctValue}:00`,
      id: this.bookedObjects.getNextBookingId(),
      ppl: this.peopleAmount.correctValue,
      repeat: false,
      starters: bookingStarters,
      table: this.tableSelected,
    }

    if (this.bookedObjects.couldBook(booking)) {
      this.bookedObjects.book({bookings: [booking]});
      this.sendBooking(booking);
    }
  }

  _selectedTable(e) {
    let target = e.target;
    while (!target.classList.contains('table')) {
      target = target.parentNode;
    }

    Object.values(this.dom.tables).forEach(table => table.classList.remove(classNames.booking.tableSelected));
    
    target.classList.add(classNames.booking.tableSelected);

    this.tableSelected = target.getAttribute('data-table');
  }

  sendBooking(booking) {
    const url = `${connectionSettings.db.url}/${connectionSettings.db.bookings}`;
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    };
    fetch(url, request).then((response) => console.log(response));
  }
}