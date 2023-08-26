import { BaseWidget } from './base-widget.js';
import { select, connectionSettings } from '../helpers.js';

/* global Handlebars, utils, dataSource, require */ // eslint-disable-line no-unused-vars

export class DatePicker extends BaseWidget{
  constructor(wrapper){
    super(wrapper, utils.dateToStr(new Date()));
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
    thisWidget.initPlugin();
  }
  initPlugin(){
    const thisWidget = this;

    thisWidget.minDate = new Date();
    thisWidget.maxDate = utils.addDays(thisWidget.minDate, connectionSettings.datePicker.maxDaysInFuture);
    // eslint-disable-next-line no-undef
    flatpickr(thisWidget.dom.input, {
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      locale: {
        firstDayOfWeek: 1
      },
      disable: [
        function(date) {
          return (date.getDay() === 1);
        }
      ],
      onChange: function(selectedDates, dateStr) {
        thisWidget.dateStr = dateStr;
        thisWidget.updateMinAndMaxDates();
      },
      onReady: function(selectedDates, dateStr) {
        thisWidget.dateStr = dateStr;
      },
    });
  }

  updateMinAndMaxDates() {
    if (this.dateStr) {
      this.minDate = new Date(this.dateStr);
      const maxDate = new Date(this.dateStr);
      maxDate.setDate(parseInt(maxDate.getDate) + 14);
      this.maxDate = maxDate;
    }
  }

  parseValue(value){
    return value;
  }

  isValid(){
    return true;
  }

  renderValue(){

  }

  getParsedDate() {
    const thisWidget = this;
    return thisWidget.dateStr;
  }
}
