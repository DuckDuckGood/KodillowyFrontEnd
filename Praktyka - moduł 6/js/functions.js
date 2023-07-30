const dataTagsAttrubite = 'data-tags';
const dataAuthorAttribute = 'data-author';
const tagsSelector = '.post-tags > .list-horizontal';
const authorSelector = '.post-author';
const postClass = '.post';
const postTitleClass = '.post-title';
const titlesClass = '.titles';
const activeClass = 'active';
const idAttribute = 'id';
const beforeend = 'beforeend';
const hrefAttribute = 'href';

export function generateTags() {
  const articles = getArticles();
  Object.values(articles).forEach(article => {
    const tags = article.getAttribute(dataTagsAttrubite).split(' ');
    Object.values(tags).forEach(tag => {
      const link = `<li><a href="#tag-${tag}">${tag}</a></li>&nbsp;`;
      article.querySelector(tagsSelector).insertAdjacentHTML(beforeend, link);
    });
  });
}

export function generateAuthors() {
  const articles = getArticles();
  Object.values(articles).forEach(article => {
    const author = article.getAttribute(dataAuthorAttribute);
    const link = `<a href="#author-${author}">by ${author}</a>`;
    article.querySelector(authorSelector).insertAdjacentHTML(beforeend, link);
  });
}

export function removeOldTitles() {
  document.querySelector(titlesClass).innerHTML = '';
}

export function generateTitles(customSelector = '') {
  removeOldTitles();
  const articles = getArticles(customSelector);
  Object.values(articles).forEach(article => {
    const articleId = article.getAttribute(idAttribute);
    const articleTitle = article.querySelector(postTitleClass).innerHTML;
    
    const link = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    document.querySelector(titlesClass).insertAdjacentHTML(beforeend, link);
  });

  const selectors = document.querySelectorAll('.titles > li > a');
  selectors.forEach(selector => selector.addEventListener('click', eventHandler));
}

export function getArticles(customSelector = '') {
  console.log(`${postClass}${customSelector}`);
  return document.querySelectorAll(`${postClass}${customSelector}`);
}

export function getTags() {
  return document.querySelectorAll(`a[href^="#tag-"]`);
}

export function getAuthors() {
  return document.querySelectorAll(`a[href^="#author-"]`);
}

export const tagClickHandler = function(event) {
  event.preventDefault();
  const clicked = this;
  const href = clicked.getAttribute(hrefAttribute);
  const tag = href.replace('#tag-', '');
  const tags = document.querySelectorAll('a.active[href^="#tag-"]');
  tags.forEach(el => el.classList.remove(activeClass));
  const sameTags = document.querySelectorAll(`a[href="${href}"]`);
  sameTags.forEach(el => el.classList.add(activeClass));
  generateTitles(`[data-tags~="${tag}"]`);
};

export const authorClickHandler = function(event) {
  event.preventDefault();
  const clicked = this;
  const href = clicked.getAttribute(hrefAttribute);
  const author = href.replace('#author-', '');
  const authors = document.querySelectorAll('a[href^="#author-"]');
  authors.forEach(el => el.classList.remove(activeClass));
  const sameAuthor = document.querySelectorAll(`a[href="${href}"]`);
  sameAuthor.forEach(el => el.classList.add(activeClass));
  generateTitles(`[data-author="${author}"]`);
}

export const eventHandler = function(event) {
  event.preventDefault();
  const clicked = this;
  const activeElements = document.getElementsByClassName(activeClass);
  Object.entries(activeElements).forEach(el => el[1].classList.remove(activeClass));

  const id = clicked.getAttribute(hrefAttribute).replace('#', '');

  clicked.classList.add(activeClass);
  document.getElementById(id).classList.add(activeClass);
};