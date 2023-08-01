const dataTagsAttrubite = 'data-tags';
const dataAuthorAttribute = 'data-author';
const tagsSelector = '.post-tags > .list-horizontal';
const tagsListSelector = '.tags.list';
const authorsListSelector = '.authors.list';
const authorSelector = '.post-author';
const postClass = '.post';
const postTitleClass = '.post-title';
const titlesClass = '.titles';
const activeClass = 'active';
const idAttribute = 'id';
const beforeend = 'beforeend';
const hrefAttribute = 'href';
const tagSizeOne = 'tag-size-1';
const tagSizeTwo = 'tag-size-2';
const tagSizeThree = 'tag-size-3';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML)
}

const handlebarTag = {
  articleLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML)
}

const handlebarAuthor = {
  articleLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
}

const handlebarTagList = {
  articleLink: Handlebars.compile(document.querySelector('#template-tag-list-link').innerHTML)
}

const handlebarAuthorList = {
  articleLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
}

function calculateTagsParams(allTags = {}) {
  const result = {};
  Object.values(allTags).forEach(count => {
    if (!result.min || count < result.min) {
      result.min = count;
    }

    if (!result.max || count > result.max) {
      result.max = count;
    }
  });
  return result;
}

function calculateTagClass(count, params) {
  if (count && params) {
    if (count === params.min) {
      return tagSizeOne;
    }
    if (count === params.max) {
      return tagSizeThree;
    }
  }
  return tagSizeTwo;
}

export function generateTags() {
  const allTags = {};
  const articles = getArticles();
  Object.values(articles).forEach(article => {
    const tags = article.getAttribute(dataTagsAttrubite).split(' ');
    Object.values(tags).forEach(tag => {
      const linkData = {tag: tag};
      const link = handlebarTag.articleLink(linkData);
      article.querySelector(tagsSelector).insertAdjacentHTML(beforeend, link);
      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    });
  });
  const allTagsData = {tags: []};
  Object.entries(allTags).forEach(entry => {
    const [tagName, count] = entry;
    const calculatedTags = calculateTagsParams(allTags);
    allTagsData.tags.push({
      tag: tagName,
      class: calculateTagClass(count, calculatedTags),
      count: count,
    });
  });
  const generatedTags = handlebarTagList.articleLink(allTagsData);
  document.querySelector(tagsListSelector).insertAdjacentHTML(beforeend, generatedTags);
}

function generateAuthorsList(allAuthors) {
  const allAuthorsData = {authors: []};
  Object.entries(allAuthors).forEach(entry => {
    const [author, count] = entry;
    allAuthorsData.authors.push({
      author: author,
      count: count,
    });
  });
  const generatedAuthors = handlebarAuthorList.articleLink(allAuthorsData);
  document.querySelector(authorsListSelector).insertAdjacentHTML(beforeend, generatedAuthors);
}

export function generateAuthors() {
  const allAuthors = {};
  const articles = getArticles();
  Object.values(articles).forEach(article => {
    const author = article.getAttribute(dataAuthorAttribute);
    const linkData = {author: author};
    const link = handlebarAuthor.articleLink(linkData);
    article.querySelector(authorSelector).insertAdjacentHTML(beforeend, link);

    if (!allAuthors[author]) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  });
  generateAuthorsList(allAuthors);
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
    
    const linkData = {id: articleId, title: articleTitle};
    const link = templates.articleLink(linkData);
    document.querySelector(titlesClass).insertAdjacentHTML(beforeend, link);
  });

  const selectors = document.querySelectorAll('.titles > li > a');
  selectors.forEach(selector => selector.addEventListener('click', eventHandler));
}

export function getArticles(customSelector = '') {
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
};

export const eventHandler = function(event) {
  event.preventDefault();
  const clicked = this;
  const activeElements = document.getElementsByClassName(activeClass);
  Object.entries(activeElements).forEach(el => el[1].classList.remove(activeClass));

  const id = clicked.getAttribute(hrefAttribute).replace('#', '');

  clicked.classList.add(activeClass);
  document.getElementById(id).classList.add(activeClass);
};