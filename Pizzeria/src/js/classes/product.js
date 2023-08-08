import { classNames, select, templates } from "../helpers.js";
import { AmountWidget } from "./amount-widget.js";

/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

export class Product {
  constructor(id, data) {
    const thisProduct = this;
    thisProduct.id = id;
    thisProduct.data = data;
    thisProduct.renderInMenu();
    thisProduct.getElements();
    thisProduct.initOrderForm();
    thisProduct.processOrder();
    thisProduct.initAccordion();
    thisProduct.initAmountWidget();
  }

  renderInMenu() {
    const thisProduct = this;
    const generatedHtml = templates.menuProduct(thisProduct.data);
    thisProduct.element = utils.createDOMFromHTML(generatedHtml);
    const menuContainer = document.querySelector(select.containerOf.menu);
    menuContainer.appendChild(thisProduct.element);
  }

  getElements(){
    const thisProduct = this;
    thisProduct.dom = {};
  
    thisProduct.dom.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
    thisProduct.dom.form = thisProduct.element.querySelector(select.menuProduct.form);
    thisProduct.dom.formInputs = thisProduct.dom.form.querySelectorAll(select.all.formInputs);
    thisProduct.dom.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
    thisProduct.dom.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
    thisProduct.dom.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
    thisProduct.dom.amountWidgetElement = thisProduct.element.querySelector(select.menuProduct.amountWidget);
  }

  _accordionEventListener(e) {
    let element = e.target;
    while (!element.classList.contains('product')) {
      element = element.parentNode;
    }

    const activeElements = document.getElementsByClassName(classNames.menuProduct.wrapperActive);
    Object.values(activeElements).filter(el => el.nodeName !== 'IMG' && el !== element).forEach(element => element.classList.remove(classNames.menuProduct.wrapperActive));
    
    element.classList.toggle(classNames.menuProduct.wrapperActive);
  }

  initAccordion() {
    const thisProduct = this;
    thisProduct.dom.accordionTrigger.addEventListener('click', thisProduct._accordionEventListener);
  }

  initAmountWidget() {
    const thisProduct = this;
    thisProduct.amountWidget = new AmountWidget(thisProduct.dom.amountWidgetElement);
    thisProduct.dom.amountWidgetElement.addEventListener('updated', () => thisProduct.processOrder());
  }

  _orderEventListener(event) {
    const thisProduct = this;
    event.preventDefault();
    thisProduct.processOrder();
  }

  initOrderForm() {
    const thisProduct = this;
    thisProduct.dom.form.addEventListener('submit', thisProduct._orderEventListener);
    thisProduct.dom.formInputs.forEach(input => input.addEventListener('change', function() {
      thisProduct.processOrder();
    }));

    thisProduct.dom.cartButton.addEventListener('click', thisProduct._orderEventListener);
  }

  calculateProductPriceAndSetImageVisibility(productParams, optionEntry, image) {
    const [optionId, option] = optionEntry;
    if (productParams) {
      Object.values(option).filter
      if (!Object.values(productParams).some(productParam => productParam === optionId)) {

        if (image) {
          image.classList.remove(classNames.menuProduct.wrapperActive);
        }

        if (option.default) {
          return option.price * -1;
        }
      }

      if (Object.values(productParams).some(productParam => productParam === optionId)) {

        if (image) {
          image.classList.add(classNames.menuProduct.wrapperActive);
        }

        if (!option.default) {
          return option.price * 1;
        }
      }
    }
    return 0;
  }

  processOrder() {
    const thisProduct = this;
    const formData = utils.serializeFormToObject(thisProduct.dom.form);
    let price = thisProduct.data.price;
    if (thisProduct.data.params) {
      Object.entries(thisProduct.data.params).forEach(paramEntry => {
        const [paramId, param] = paramEntry;

        Object.entries(param.options).forEach(optionEntry => {
          const optionId = optionEntry[0];
          const imageClass = `.${paramId}-${optionId}`;
          const image = document.querySelector(imageClass);
          price = paramId === 'sauce' && formData.sauce ? price + thisProduct.calculateProductPriceAndSetImageVisibility(formData.sauce, optionEntry, image) : price;
          price = paramId === 'toppings' && formData.toppings ? price + thisProduct.calculateProductPriceAndSetImageVisibility(formData.toppings, optionEntry, image) : price;
          price = paramId === 'crust' && formData.crust ? price + thisProduct.calculateProductPriceAndSetImageVisibility(formData.crust, optionEntry, image) : price;
          price = paramId === 'ingredients' && formData.ingredients ? price + thisProduct.calculateProductPriceAndSetImageVisibility(formData.ingredients, optionEntry, image) : price;
          price = paramId === 'coffee' && formData.coffee ? price + thisProduct.calculateProductPriceAndSetImageVisibility(formData.coffee, optionEntry, image) : price;
        });
      });
    }
    if (thisProduct.amountWidget) {
      price *= thisProduct.amountWidget.amount;
    }
    thisProduct.dom.priceElem.innerHTML = price;
  }
}