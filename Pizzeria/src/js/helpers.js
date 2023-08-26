/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

export const connectionSettings = {
  amountWidget: {
    defaultValue: 1,
    defaultMin: 1,
    defaultMax: 9,
  },
  db: {
    url: 'http://localhost:3131',
    products: 'products',
    orders: 'orders',
    product: 'product',
    order: 'order',
    bookings: 'bookings',
    events: 'events',
    dateStartParamKey: 'date_gte',
    dateEndParamKey: 'date_lte',
    notRepeatParam: 'repeat=false',
    repeatParam: 'repeat_ne=false',
  },
  hours: {
    open: 12,
    close: 24,
  },
  datePicker: {
      maxDaysInFuture: 14,
  },
  booking: {
      tableIdAttribute: 'data-table',
  },
};


const sendOrdersUrl = `${connectionSettings.db.url}/${connectionSettings.db.orders}`;

export async function sendOrders(payload) {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  fetch(sendOrdersUrl, request);
}

export const select = {
  templateOf: {
    menuProduct: '#template-menu-product',
    cartProduct: '#template-cart-product', // CODE ADDED
    bookingWidget: '#template-booking-widget',
  },
  containerOf: {
    menu: '#product-list',
    cart: '#cart',
    pages: '#pages',
    booking: '.booking-wrapper',
    mainNav: '.main-nav',
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
      input: 'input.amount', // CODE CHANGED
      linkDecrease: 'a[href="#less"]',
      linkIncrease: 'a[href="#more"]',
    },
    datePicker: {
      wrapper: '.date-picker',
      input: `input[name="date"]`,
    },
    hourPicker: {
        wrapper: '.hour-picker',
        input: 'input[type="range"]',
        output: '.output',
        bookingHour: '.booking-hour',
    },
  },
  // CODE ADDED START
  cart: {
    productList: '.cart__order-summary',
    toggleTrigger: '.cart__summary',
    totalNumber: `.cart__total-number`,
    totalPrice: '.cart__total-price strong, .cart__order-total .cart__order-price-sum strong',
    subtotalPrice: '.cart__order-subtotal .cart__order-price-sum strong',
    deliveryFee: '.cart__order-delivery .cart__order-price-sum strong',
    form: '.cart__order',
    formSubmit: '.cart__order [type="submit"]',
    phone: '[name="phone"]',
    address: '[name="address"]',
  },
  cartProduct: {
    amountWidget: '.widget-amount',
    price: '.cart__product-price',
    edit: '[href="#edit"]',
    remove: '[href="#remove"]',
  },
  // CODE ADDED END
  booking: {
    peopleAmount: '.people-amount',
    hoursAmount: '.hours-amount',
    tables: '.floor-plan .table',
    table: '.table',
    bookingButton: '.booking-button',
  },
  nav: {
      links: '.main-nav a',
  },
};

export const classNames = {
  menuProduct: {
    wrapperActive: 'active',
    imageVisible: 'active',
  },
  // CODE ADDED START
  cart: {
    wrapperActive: 'active',
  },
  // CODE ADDED END
  booking: {
    loading: 'loading',
    tableBooked: 'booked',
    tableSelected: 'table-selected',
  },
  nav: {
      active: 'active',
  },
  pages: {
      active: 'active',
  }
};

export const settings = {
  amountWidget: {
    defaultValue: 1,
    defaultMin: 1,
    defaultMax: 9,
  }, // CODE CHANGED
  // CODE ADDED START
  cart: {
    defaultDeliveryFee: 20,
  },
  // CODE ADDED END
  
};

export const templates = {
  menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  // CODE ADDED START
  cartProduct: Handlebars.compile(document.querySelector(select.templateOf.cartProduct).innerHTML),
  // CODE ADDED END
  bookingWidget: Handlebars.compile(document.querySelector(select.templateOf.bookingWidget).innerHTML),
};

export async function fetchFromUrl(url = '') {
  let response;

  await fetch(url)
    .then(rawResponse => rawResponse.json())
    .then(parsedResponse => {
      response = parsedResponse;
    });
  return response;
}

export function jsonResponses(allResponses) {
  const jsonResponses = [];
  Object.values(allResponses).forEach(response => jsonResponses.push(response.json()));
  return jsonResponses;
}

export function parseDate(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = '' + date.getMonth();
    const day = '' + date.getDay();

    return `${year}-${month.length > 1 ? month : '0' + month}-${day.length > 1 ? day : '0' + day}`;
  }
  return date;
}

export function printInConsole(o, tabs = 0) {
  let spaceTabs = '';
  for (let i; i <= tabs; i++) {
    spaceTabs += '\t';
  }
  if (o && typeof o === 'object') {
    Object.entries(o).forEach(entry => {
      const [key, value] = entry;
      if (value && typeof value === 'object') {
        console.log(`${spaceTabs}${key}`);
        printInConsole(value, tabs + 1);
      } else {
        console.log(`${spaceTabs}${key} - ${value}`);
      }
    });
  } else {
    console.log(`${spaceTabs}${o}`);
  }
}
