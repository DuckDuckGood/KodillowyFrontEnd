import { classNames, select, templates } from "../helpers.js";
import { CartProduct } from "./cart-product.js";

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
    thisCart.dom.totalPrice = thisCart.dom.wrapper.querySelector(select.cart.totalPrice);
  }

  _cartVisibilityToggle() {
    const thisCart = this;
    thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
  }

  initActions() {
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', () => thisCart._cartVisibilityToggle());
  }

  updateTotalPrice() {
    const thisCart = this;
    let totalPrice = 0;

    if (thisCart.products) {
      Object.values(thisCart.products).forEach(product => {
        totalPrice += parseInt(product.summaryPrice);
      });
    }

    thisCart.dom.totalPrice.innerHTML = totalPrice;
  }

  add(menuProduct) {
    const thisCart = this;
    
    const generatedHTML = templates.cartProduct(menuProduct);
    const cartProductDOM = utils.createDOMFromHTML(generatedHTML);
    
    cartProductDOM.addEventListener('updated', () => thisCart.updateTotalPrice());
    thisCart.dom.productList.appendChild(cartProductDOM);

    const cartProduct = new CartProduct(menuProduct, cartProductDOM);
    thisCart.products.push(cartProduct);
    thisCart.updateTotalPrice();
  }
}