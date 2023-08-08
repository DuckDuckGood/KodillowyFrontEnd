import { classNames, select } from "../helpers.js";

export class Cart {
  constructor (element) {
    const thisCart = this;
    thisCart.products = [];
    thisCart.getElements(element);
    thisCart.initActions();
  }

  getElements(element) {
    const thisCart = this;
    thisCart.dom = {};
    thisCart.dom.wrapper = element;

    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
  }

  _cartVisibilityToggle() {
    const thisCart = this;
    thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
  }

  initActions() {
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', () => thisCart._cartVisibilityToggle());
  }
}