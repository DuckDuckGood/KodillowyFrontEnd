import { Cart } from "./classes/cart.js";
import { Product } from "./classes/product.js";
import { select } from "./helpers.js";

/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const settings = { // eslint-disable-line no-unused-vars
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };

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
    initCart: function() {
      const thisApp = this;
      const cartElem = document.querySelector(select.containerOf.cart);
      thisApp.cart = new Cart(cartElem);
    },
    init: function(){
      const thisApp = this;
      thisApp.initData();
      thisApp.initMenu();
      thisApp.initCart();
    },
  };

  app.init();
}
