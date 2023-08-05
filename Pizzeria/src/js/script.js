/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

const select = {
  templateOf: {
    menuProduct: "#template-menu-product",
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = { // eslint-disable-line no-unused-vars
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };

  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };

  class Product {
    constructor(id, data) {
      const thisProduct = this;
      thisProduct.id = id;
      thisProduct.data = data;
      thisProduct.renderInMenu();
      thisProduct.getElements();
      thisProduct.initOrderForm();
      thisProduct.processOrder();
      thisProduct.initAccordion();
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
    
      thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
      thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
      thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
      thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
      thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
      thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
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
      thisProduct.accordionTrigger.addEventListener('click', thisProduct._accordionEventListener);
    }

    _orderEventListener(event) {
      event.preventDefault();
    }

    initOrderForm() {
      const thisProduct = this;
      thisProduct.form.addEventListener('submit', thisProduct._orderEventListener);
      thisProduct.formInputs.forEach(input => input.addEventListener('change', function() {
        thisProduct.processOrder();
      }));

      thisProduct.cartButton.addEventListener('click', thisProduct._orderEventListener);
    }

    processOrder() {
      const thisProduct = this;
      const formData = utils.serializeFormToObject(thisProduct.form);
      let price = thisProduct.data.price;
      //console.log(thisProduct.imageWrapper);
      if (thisProduct.data.params) {
        //console.log(thisProduct.data.params);
        Object.entries(thisProduct.data.params).forEach(paramEntry => {
          const [paramId, param] = paramEntry;

          Object.entries(param.options).forEach(optionEntry => {
            const [optionId, option] = optionEntry;
            
            if (formData.ingredients) {
              const imageClass = `.${paramId}-${optionId}`;
              const image = document.querySelector(imageClass);
              if (!Object.values(formData.ingredients).some(ingredient => ingredient === optionId)) {
                if (option.default) {
                  price--;
                }
                image.classList.remove(classNames.menuProduct.wrapperActive);
              }
              
              if (Object.values(formData.ingredients).some(ingredient => ingredient === optionId)) {
                if (!option.default) {
                  price++;
                }
                image.classList.add(classNames.menuProduct.wrapperActive);
              }
            }
          });
        });
      }
      thisProduct.priceElem.innerHTML = price;
    }
  }

  const app = {
    initMenu: function() {
      const thisApp = this;
      Object.entries(thisApp.data.products).forEach(entry => {
        const [key, value] = entry;
        new Product(key, value);
      });
    },
    initData: function() {
      const thisApp = this;
      thisApp.data = dataSource;
    },
    init: function(){
      const thisApp = this;
      // console.log('*** App starting ***');
      // console.log('thisApp:', thisApp);
      // console.log('classNames:', classNames);
      // console.log('settings:', settings);
      // console.log('templates:', templates);
      thisApp.initData();
      // console.log('thisApp.data:', thisApp.data);
      thisApp.initMenu();
    },
  };

  app.init();
}
