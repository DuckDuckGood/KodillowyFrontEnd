import { dataSource } from './data.js';

const favorite = 'favorite';
const favoriteBooks = [];
const book__image = 'book__image';
const book__rating = 'book__rating';
const dataId = 'data-id';
const hide = 'hide';
const checkBoxes = {
  adults: false,
  nonFiction: false,
};

export const booksList = document.getElementsByClassName('books-list')[0];

export const select = {
  templateOf: {
    book: '#template-book',
  },
  filters: {
    filtersClass: '.filters',
    nonFiction: 'nonFiction',
    adultsOnly: 'adults',
  },
};

export const templates = {
  book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

export function bookDoubleClickHandler(e) {
  let bookImage = e.target;

  while (bookImage.parentNode && !bookImage.classList.contains(book__image)) {
    Object.values(bookImage.children).forEach(child => {
      const condition1 = !bookImage.classList || (bookImage.classList && !bookImage.classList.contains(book__image));
      const condition2 = child.classList.contains(book__image);
      if (condition1 && condition2) {
        bookImage = child;
      }
    });
    
    if ((bookImage.classList && !bookImage.classList.contains(book__image))) {
      bookImage = bookImage.parentNode;
    }
  }

  toggleFavorite(bookImage);
}

export function toggleFavorite(bookImage) {
  if (bookImage && bookImage.classList && bookImage.attributes) {
    const dataId = parseInt(bookImage.getAttribute('data-id'));
    bookImage.classList.toggle(favorite);

    const inFavorites = Object.values(favoriteBooks).some(bookId => bookId === dataId);
    if (inFavorites) {

      const index = favoriteBooks.indexOf(dataId);

      favoriteBooks.splice(index, 1);
    } else {
      favoriteBooks.push(dataId);
    }
  }
}

export function filterListener(e) {

  checkBoxes[e.target.value] = e.target.checked;

  Object.values(booksList.children).forEach(child => {
    let bookImage = child;

    while (!isBookImage(bookImage) && bookImage.children) {
      Object.values(bookImage.children).forEach(bookChild => {
        if (bookChild.classList.contains(book__image)) {
          bookImage = bookChild;
        }
      });
    }

    const bookImageId = bookImage.getAttribute(dataId);
    if (checkBoxes.adults || checkBoxes.nonFiction) {
      const bookDetails = dataSource.books.filter(book => parseInt(book.id) === parseInt(bookImageId))[0].details;
      if (!(bookDetails.adults === checkBoxes.adults && bookDetails.nonFiction === checkBoxes.nonFiction)) {
        child.classList.add(hide);
      } else {
        child.classList.remove(hide);
      }
    } else {
      child.classList.remove(hide);
    }
  });
}

export function isBookImage(o) {
  return o && o.classList && o.classList.contains(book__image);
}

export function beautifyRatings(generatedBook) {
  if (generatedBook && generatedBook.children) {
    Object.values(generatedBook.children)
      .filter(child => child.classList.contains(book__rating))
      .forEach(bookRating => {
        const bookRatingFill = bookRating.children[0];
        const rating = parseFloat(bookRatingFill.innerHTML);
        let backgroundStyle;
        let widthStyle;

        if (isFinite(rating)) {
          if (rating < 6) {
            backgroundStyle = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
          }
          if (rating >= 6 && rating < 8) {
            backgroundStyle = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
          }
          if (rating >= 8 && rating < 9) {
            backgroundStyle = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
          }
          if (rating >= 9) {
            backgroundStyle = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
          }

          widthStyle = `${rating * 10}%`;
        }

        if (backgroundStyle && widthStyle) {
          bookRatingFill.style.background = backgroundStyle;
          bookRatingFill.style.width = widthStyle;
        }
      });
  }
}