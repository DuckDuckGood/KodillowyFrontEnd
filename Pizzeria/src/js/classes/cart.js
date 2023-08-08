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
    thisCart.dom.subTotal = thisCart.dom.wrapper.querySelector(select.cart.subtotalPrice);
    thisCart.dom.delivery = thisCart.dom.wrapper.querySelector(select.cart.deliveryFee);
    thisCart.dom.totalWithDelivery = thisCart.dom.wrapper.querySelectorAll(select.cart.totalPrice)[1];
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
    thisCart.totalPrice = 0;
    
    if (thisCart.products) {
      Object.values(thisCart.products).forEach(product => {
        thisCart.totalPrice += parseInt(product.summaryPrice);
      });
    }

    thisCart.dom.totalPrice.innerHTML = thisCart.totalPrice;
    this.addDeliveryCost();
  }

  addDeliveryCost() {
    const thisCart = this;
    thisCart.dom.subTotal.innerHTML = thisCart.totalPrice;
    thisCart.dom.delivery.innerHTML = 20;
    thisCart.dom.totalWithDelivery.innerHTML = 20 + parseInt(thisCart.totalPrice);
  }

  removeProduct(e) {
    const thisCart = this;

    const newProductArray = [];

    Object.values(thisCart.products)
      .filter(product => product !== e.detail.cartProduct)
      .forEach(product => newProductArray.push(product));

    thisCart.products = newProductArray;

    thisCart.dom.productList.removeChild(e.detail.cartProduct.dom.wrapper);
    thisCart.updateTotalPrice();
  }

  add(menuProduct) {
    const thisCart = this;
    
    const generatedHTML = templates.cartProduct(menuProduct);
    const cartProductDOM = utils.createDOMFromHTML(generatedHTML);
    
    thisCart.dom.productList.appendChild(cartProductDOM);

    const cartProduct = new CartProduct(menuProduct, cartProductDOM);
    
    thisCart.products.push(cartProduct);
    thisCart.updateTotalPrice();

    thisCart.dom.productList.addEventListener('updated', () => thisCart.updateTotalPrice());
    thisCart.dom.productList.addEventListener('removed', e => thisCart.removeProduct(e));
  }
}