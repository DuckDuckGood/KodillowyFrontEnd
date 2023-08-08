import { select } from "../helpers.js";

export class AmountWidget {
  constructor(element) {
    const thisWidget = this;
    thisWidget.getElements(element);
  }

  announce() {
    const thisWidget = this;
    const event = new Event('updated');
    thisWidget.element.dispatchEvent(event);
  }

  _validateAndPrintAmount() {
    const thisWidget = this;
    const parsedAmount = parseInt(thisWidget.amount);
    thisWidget.amount = isFinite(parsedAmount) ? parsedAmount : 10;

    if (thisWidget.amount < 0) {
      thisWidget.amount = 0;
    }
    if (thisWidget.amount > 10) {
      thisWidget.amount = 10;
    }

    thisWidget.input.value = thisWidget.amount;
    thisWidget.announce();
  }

  _setAmount(e) {
    const thisWidget = this;
    thisWidget.amount = e.target.value;
    thisWidget._validateAndPrintAmount();
  }

  _clickOnAmount(amount = 0) {
    const thisWidget = this;
    thisWidget.amount = parseInt(thisWidget.input.value) + parseInt(amount);
    thisWidget._validateAndPrintAmount();
  }

  getElements(element) {
    const thisWidget = this;
    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
    thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);

    thisWidget.input.value = 1; //default value

    thisWidget.input.addEventListener('change', e => thisWidget._setAmount(e));
    thisWidget.linkDecrease.addEventListener('click', () => thisWidget._clickOnAmount(-1));
    thisWidget.linkIncrease.addEventListener('click', () => thisWidget._clickOnAmount(1));
  }
}