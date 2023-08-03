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

  const settings = {
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
      thisProduct.initAccordion();
    }

    renderInMenu() {
      const thisProduct = this;
      const generatedHtml = templates.menuProduct(thisProduct.data);
      thisProduct.element = utils.createDOMFromHTML(generatedHtml);
      const menuContainer = document.querySelector(select.containerOf.menu);
      menuContainer.appendChild(thisProduct.element);
    }

    _accordionEventListener(e) {
      let element = e.target;
      while (!element.classList.contains('product')) {
        element = element.parentNode;
      }

      const activeElements = document.getElementsByClassName(classNames.menuProduct.wrapperActive);
      Object.values(activeElements).filter(el => el !== element).forEach(element => element.classList.remove(classNames.menuProduct.wrapperActive));
      
      element.classList.toggle(classNames.menuProduct.wrapperActive);
    }

    initAccordion() {
      const thisProduct = this;
      thisProduct.element.addEventListener('click', thisProduct._accordionEventListener);
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
