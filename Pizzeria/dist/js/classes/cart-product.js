import { AmountWidget } from "./amount-widget.js";
import { select } from "../helpers.js";

export class CartProduct {
  constructor(product, element) {
    const thisCartProduct = this;
    
    if (product) {
      Object.entries(product).forEach(productEntry => {
        const [key, value] = productEntry;
        thisCartProduct[key] = value;
      });
    }

    thisCartProduct.getElements(element);

    thisCartProduct.initAmountWidget();
    thisCartProduct.initProductRemoving();
  }

  getElements (element) {
    const thisCartProduct = this;
    thisCartProduct.dom = {};
    thisCartProduct.dom.wrapper = element;
    thisCartProduct.dom.amountWidget = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.amountWidget);
    thisCartProduct.dom.edit = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.edit);
    thisCartProduct.dom.price = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.price);
    thisCartProduct.dom.remove = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.remove);
  }

  _amountWidgetHandler() {
    const thisCartProduct = this;
    if (thisCartProduct.amountWidget && isFinite(thisCartProduct.amountWidget.amount)) {
      thisCartProduct.summaryPrice = parseInt(thisCartProduct.price) * parseInt(thisCartProduct.amountWidget.amount);
    }
    thisCartProduct.dom.price.innerHTML = thisCartProduct.summaryPrice;
  }

  initAmountWidget() {
    const thisCartProduct = this;
    thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget);
    thisCartProduct.dom.amountWidget.addEventListener('click', () => thisCartProduct._amountWidgetHandler());
  }

  remove() {
    const thisCartProduct = this;
    const event = new CustomEvent('removed', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct,
      },
    });
    thisCartProduct.dom.wrapper.dispatchEvent(event);
  }

  initProductRemoving() {
    const thisCartProduct = this;
    thisCartProduct.dom.remove.addEventListener('click', () => this.remove());
  }

  getData() {
    const thisCartProduct = this;

    return {
      id: thisCartProduct.id,
      amount: thisCartProduct.amount,
      price: thisCartProduct.price ? thisCartProduct.price : 0,
      priceSingle: thisCartProduct.priceSingle ? thisCartProduct.priceSingle : 0,
      name: thisCartProduct.name,
      params: thisCartProduct.params,
    }
  }
}