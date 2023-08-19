import { AmountWidget } from './amount-widget.js';
import { select, templates } from '../helpers.js';

/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

export class Booking {
  constructor(element) {
    this.render(element);
    this.initWidgets();
  }
  
  render(element) {
    this.dom = {};
    this.dom.wrapper = element;
    this.dom.wrapper.innerHTML = templates.bookingWidget();

    this.dom.peopleAmount = this.dom.wrapper.querySelector(select.booking.peopleAmount);
    this.dom.hoursAmount = this.dom.wrapper.querySelector(select.booking.hoursAmount);
  }

  peopleWidgetHandler(e) {
    console.log('people', e.target);
  }

  hoursWidgetHandler(e) {
    console.log('hours', e.target);
  }

  initWidgets() {
    this.peopleAmount = new AmountWidget(this.dom.peopleAmount);
    this.dom.peopleAmount.addEventListener('click', e => this.peopleWidgetHandler(e));

    this.hoursAmount = new AmountWidget(this.dom.hoursAmount);
    this.dom.hoursAmount.addEventListener('click', e => this.hoursWidgetHandler(e));
  }
}