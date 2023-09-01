import { Booking } from './classes/booking.js';
import { Cart } from './classes/cart.js';
import { Product } from './classes/product.js';
import { classNames, connectionSettings, fetchFromUrl, select } from './helpers.js';
import { HomePage } from './home-page.js';

const fetchUrl = `${connectionSettings.db.url}/${connectionSettings.db.products}`;

function getIdFromHref(e) {
  e.preventDefault();
  const href = e.target.getAttribute('href');
  
  return href.replace('#', '');
}

export const app = {
  initBooking: function() {
    const thisApp = this;
    const bookingElement = document.querySelector(select.containerOf.booking);
    thisApp.booking = new Booking(bookingElement);
  },
  initHomePage: function() {
    const thisApp = this;
    const homePageElement = document.querySelector(select.containerOf.home);
    thisApp.homePage = new HomePage(homePageElement);
    homePageElement.addEventListener('activatePage', e => thisApp.activatePage(e.detail.pageId));
  },
  activatePage: function(argumentId) {
    let pageId = argumentId;
    const thisApp = this;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    if (!Object.values(thisApp.pages).some(page => page.id === pageId)) {
      pageId = thisApp.pages[0].id;
    }
    Object.values(thisApp.pages).forEach(page => page.classList.toggle(classNames.pages.active, page.id === pageId));
    Object.values(thisApp.navLinks).forEach(navLink => {
      navLink.classList.toggle(classNames.nav.active, navLink.getAttribute('href') === '#' + pageId);
      window.location.hash = '#/' + pageId;
    });
  },
  initPages: function() {
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;

    thisApp.activatePage(window.location.hash.replace('#/', ''));

    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    Object.values(thisApp.navLinks).forEach(link => link.addEventListener('click', e => thisApp.activatePage(getIdFromHref(e))));
  },
  initMenu: function() {
    const thisApp = this;
    Object.entries(thisApp.data).forEach(entry => {
      const [key, value] = entry;
      new Product(key, value);
    });
  },
  initData: async function() {
    const thisApp = this;
    thisApp.data = await fetchFromUrl(fetchUrl);
  },
  initCart: function() {
    const thisApp = this;
    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);
  },
  init: async function(){
    const thisApp = this;
    thisApp.initPages();
    await thisApp.initData();
    thisApp.initMenu();
    thisApp.initCart();
    thisApp.initBooking();
    thisApp.initHomePage();
  },
};