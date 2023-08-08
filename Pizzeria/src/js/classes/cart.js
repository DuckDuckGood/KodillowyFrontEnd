import { classNames, select, templates } from "../helpers.js";

/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

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
    thisCart.dom.productList = thisCart.dom.wrapper.querySelector(select.cart.productList);
  }

  _cartVisibilityToggle() {
    const thisCart = this;
    thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
  }

  initActions() {
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', () => thisCart._cartVisibilityToggle());
  }

  add(menuProduct) {
    console.log(menuProduct);
    const thisCart = this;
    
    const generatedHTML = templates.cartProduct(menuProduct);
    thisCart.element = utils.createDOMFromHTML(generatedHTML);
    thisCart.dom.productList.appendChild(thisCart.element);
  }
}