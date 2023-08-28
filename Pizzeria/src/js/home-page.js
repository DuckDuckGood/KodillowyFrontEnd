import { classNames, select, templates } from './helpers.js';

export class HomePage {
  constructor(wrapper) {
    this.dom = {};
    this.dom.wrapper = wrapper;
    this.dom.wrapper.innerHTML = templates.homePage();
    this.initBookmarkListeners();

    const elem = document.querySelector('.carousel');
    const flkty = new Flickity( elem, { // eslint-disable-line no-unused-vars, no-undef
      // options
      cellAlign: 'center',
      contain: true,
      wrapAround: true,
      imagesLoaded: true,
    });
  }

  initBookmarkListeners() {
    this.dom.bookmarks = this.dom.wrapper.querySelectorAll(select.home.bookmarkImage);
    this.navLinks = document.querySelectorAll(select.nav.links);
    
    Object.values(this.dom.bookmarks).forEach(bookmark => {
      const bookmarkHref = bookmark.getAttribute('href');
      Object.values(this.navLinks).forEach(navLink => {
        const navLinkHref = navLink.getAttribute('href');
        
        if (bookmarkHref === navLinkHref) {
          bookmark.addEventListener('click', () => this.activatePage(navLink, bookmarkHref));
        }
      });
    });
  }

  activatePage(navLink, bookmarkHref) {
    Object.values(this.navLinks).forEach(navLink => navLink.classList.remove(classNames.nav.active));
    navLink.classList.add(classNames.nav.active);

    const event = new CustomEvent('activatePage', {
      bubbles: true,
      detail: {
        pageId: bookmarkHref.replace('#', ''),
      },
    });

    this.dom.wrapper.dispatchEvent(event);
  }
}