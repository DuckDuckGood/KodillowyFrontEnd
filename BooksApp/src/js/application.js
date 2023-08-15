import { dataSource } from './data.js';
import { utils } from './functions.js';
import { beautifyRatings, bookDoubleClickHandler, booksList, filterListener, select, templates } from './helpers.js';

export class Application {

  initBooks() {
    Object.values(dataSource.books).forEach(book => {
      const bookTemplate = templates.book(book);
      const generated = utils.createDOMFromHTML(bookTemplate);
      beautifyRatings(generated);

      booksList.appendChild(generated);
    });
    booksList.addEventListener('dblclick', e => bookDoubleClickHandler(e));
  }

  initFiltersListener() {
    const filters = document.querySelector(select.filters.filtersClass);
    Object.values(filters.children[0].children).forEach(label => {
      const filter = label.children[0];
      
      if (filter.value === select.filters.adultsOnly || filter.value === select.filters.nonFiction) {
        filter.addEventListener('click', e => filterListener(e));
      }
    });
  }
}