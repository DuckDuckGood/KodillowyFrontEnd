export class BaseWidget {
  constructor(wrapperElement, initialValue) {
    this.dom = {};
    this.dom.wrapper = wrapperElement;
    this.value = initialValue;
  }

  get value() {
    return this.correctValue;
  }

  set value(value) {
    this.correctValue = value;
    this.validateAndPrintAmount(this.scope);
  }

  setValue(value) {
    this.correctValue = value;
    this.validateAndPrintAmount(this.scope);
  }

  validateAndPrintAmount(scope = {}) {
    console.log(scope);

    if (!this.correctValue) {
      this.correctValue = 1;
    }

    const parsedAmount = parseInt(this.correctValue);
    this.correctValue = isFinite(parsedAmount) 
      ? (
          scope && scope.min && scope.max 
            ? (parsedAmount < scope.min ? scope.min : (parsedAmount > scope.max ? scope.max : parsedAmount)) 
            : parsedAmount
        )
      : 1;

      // this.setValue(this.correctValue);
      this.announce();
  }

  announce() {
    const event = new CustomEvent('updated', {
      bubbles: true,
    });
    this.dom.wrapper.dispatchEvent(event);
  }
}