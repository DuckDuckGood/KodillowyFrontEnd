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
  }

  _amountWidgetHandler() {
    const thisCartProduct = this;
    if (thisCartProduct.amountWidget && isFinite(thisCartProduct.amountWidget.amount)) {
      thisCartProduct.summaryPrice = parseInt(thisCartProduct.price) * parseInt(thisCartProduct.amountWidget.amount);
    }
    thisCartProduct.dom.price.innerHTML = thisCartProduct.summaryPrice;

    const event = new Event('updated');
    thisCartProduct.dom.wrapper.dispatchEvent(event);
  }

  initAmountWidget() {
    const thisCartProduct = this;
    thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget);
    thisCartProduct.dom.amountWidget.addEventListener('click', () => thisCartProduct._amountWidgetHandler());
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
}