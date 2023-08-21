import { BaseWidget } from './base-widget.js';
import { select, settings } from "../helpers.js";

export class AmountWidget extends BaseWidget {
  constructor(element) {
    super(element, settings.amountWidget.defaultValue);
    const thisWidget = this;

    thisWidget.scope = {
      min: parseInt(settings.amountWidget.defaultMin),
      max: parseInt(settings.amountWidget.defaultMax),
    };

    thisWidget.getElements(element);
  }

  _clickOnAmount(amount = 0) {
    const thisWidget = this;
    thisWidget.value += parseInt(amount);
    thisWidget.validateAndPrintAmount(thisWidget.scope);
  }

  getElements(element) {
    const thisWidget = this;
    thisWidget.dom.wrapper = element;
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input);
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);

    thisWidget.dom.input.addEventListener('change', e => thisWidget.setValue(e.target.value, thisWidget.scope));
    thisWidget.dom.linkDecrease.addEventListener('click', () => thisWidget._clickOnAmount(-1));
    thisWidget.dom.linkIncrease.addEventListener('click', () => thisWidget._clickOnAmount(1));
  }

  setValue(value) {
    const thisWidget = this;
    if (thisWidget.dom && thisWidget.dom.input && thisWidget.dom.input.value) {
      thisWidget.dom.input.value = value;
    }
  }
}