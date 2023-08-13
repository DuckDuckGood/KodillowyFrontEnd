import { classNames, select, sendOrders, templates } from "../helpers.js";
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
    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);
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

  preparePayload() {
    const thisCart = this;

    thisCart.payload = {
      address: thisCart.dom.wrapper.querySelector(select.cart.address).value,
      phone: thisCart.dom.wrapper.querySelector(select.cart.phone).value,
      totalPrice: thisCart.totalWithDelivery
        ? thisCart.totalWithDelivery
        : 0,
      subtotalPrice: thisCart.totalPrice
        ? thisCart.totalPrice
        : 0,
      totalNumber: thisCart.dom.wrapper.querySelector(select.cart.totalNumber).value,
      deliveryFee: thisCart.totalWithDelivery && thisCart.totalPrice
        ? parseInt(thisCart.totalWithDelivery) - parseInt(thisCart.totalPrice)
        : 0,
        products: [],
    };

    Object.values(thisCart.products).forEach(product => thisCart.payload.products.push(product.getData()));
  }

  sendOrders() {
    const thisCart = this;
    thisCart.preparePayload();
    sendOrders(thisCart.payload);
  }

  _submitHandler(e) {
    const thisCart = this;
    thisCart.sendOrders();
    e.preventDefault();
  }

  initActions() {
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', () => thisCart._cartVisibilityToggle());
    thisCart.dom.form.addEventListener('submit', e => thisCart._submitHandler(e));
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