import { BaseWidget } from './base-widget.js';
import { select, connectionSettings } from '../helpers.js';
import { RangeSlider } from '../../vendor/range-slider.js';
import { getToday, parseHour } from './booking-helpers.js';

/* global Handlebars, utils, dataSource, require */ // eslint-disable-line no-unused-vars

export class HourPicker extends BaseWidget{
  constructor(wrapper){
    super(wrapper, connectionSettings.hours.open);
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.input);
    thisWidget.setActualHourInWidget();

    thisWidget.dom.output = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.output);
    thisWidget.initPlugin();
    thisWidget.value = parseFloat(thisWidget.dom.input.value);
    thisWidget.printBookingHour();
  }

  initPlugin(){
    const thisWidget = this;
    // eslint-disable-next-line no-undef
    RangeSlider.create(thisWidget.dom.input);
    thisWidget.dom.input.addEventListener('input', function(){
      thisWidget.value = parseFloat(thisWidget.dom.input.value);
      thisWidget.printBookingHour();
    });
  }

  parseValue(value){
    return utils.numberToHour(value);
  }

  isValid(){
    return true;
  }

  renderValue(){
    const thisWidget = this;

    thisWidget.dom.output.innerHTML = thisWidget.value;
  }

  setActualHourInWidget() {
    const thisWidget = this;
    const date = new Date();
    const widgetHour = date.getMinutes() > 0 ? date.getHours() + 1 : date.getHours();
    thisWidget.dom.input.value = parseFloat(widgetHour);
  }

  printBookingHour() {
    const thisWidget = this;
    const date = new Date();
    thisWidget.dom.output.innerHTML = parseHour(thisWidget.value);
    if (this.selectedToday()
      && (
        parseInt(thisWidget.value) < parseInt(date.getHours())
        || (parseInt(thisWidget.value) === parseInt(date.getHours())
        && parseInt(date.getMinutes()) > 0))) {

      thisWidget.dom.output.style.color = 'red';
    } else {
      thisWidget.dom.output.style.color = '';
    }
    if (this.bookedObjects) {
      this.markBookedTables();
    }
  }

  addBookedObjects(bookedObjects) {
    this.bookedObjects = bookedObjects;
  }

  addDatePicker(datePicker) {
    this.datePicker = datePicker;
  }

  selectedToday() {
    return this.datePicker && this.datePicker.getParsedDate() === getToday();
  }

  getBookedTables() {
    if (this.bookedObjects.booked.bookings && this.bookedObjects.booked.bookings[this.datePicker.getParsedDate()] && this.bookedObjects.booked.bookings[this.datePicker.getParsedDate()][parseHour(this.value)]) {
      return this.bookedObjects.booked.bookings[this.datePicker.getParsedDate()][parseHour(this.value)];
    }
    return [];
  }

  addTablesDom(tablesDom) {
    this.dom.tables = tablesDom;
  }

  markBookedTables() {
    const thisWidget = this;
    if (thisWidget.dom.tables) {
      Object.values(thisWidget.dom.tables).forEach(table => {
        const tableId = table.getAttribute('data-table');
        if (Object.values(thisWidget.getBookedTables()).some(bookedTable => parseInt(bookedTable) === parseInt(tableId))) {
          table.style.color = 'red';
        } else {
          table.style.color = '';
        }
      });
    }
  }
}
