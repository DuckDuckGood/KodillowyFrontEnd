'use strict';
{
  const postClass = '.post';
  const postTitleClass = '.post-title';
  const titlesClass = '.titles';
  const activeClass = 'active';

  const dataTagsAttrubite = 'data-tags';
  const idAttribute = 'id';

  const tagsSelector = '.post-tags > .list-horizontal';

  const beforeend = 'beforeend';

  const href = 'href';

  const eventHandler = function(event) {
    event.preventDefault();
    const clicked = this;
    const activeElements = document.getElementsByClassName(activeClass);
    Object.entries(activeElements).forEach(el => el[1].classList.remove(activeClass));

    const id = clicked.getAttribute(href).replace('#', '');

    clicked.classList.add(activeClass);
    document.getElementById(id).classList.add(activeClass);
  };

  const tagClickHandler = function(event) {
    event.preventDefault();
    const clicked = this;
    const tag = clicked.getAttribute(href).replace('#', '');
    const tags = Object.values(document.getElementsByClassName(activeClass)).filter(el => el.classList.contains('tag'));
    tags.forEach(el => el.classList.remove(activeClass));
    console.log(tags);
  };

  generateTitles();
  const selectors = document.querySelectorAll('li > a');
  selectors.forEach(selector => selector.addEventListener('click', eventHandler));
  generateTags();

  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => tag.addEventListener('click', tagClickHandler));

  // eslint-disable-next-line no-inner-declarations
  function generateTitles() {
    removeOldTitles();
    const articles = getArticles();
    Object.values(articles).forEach(article => {
      const articleId = article.getAttribute(idAttribute);
      const articleTitle = article.querySelector(postTitleClass).innerHTML;
      
      const link = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
      document.querySelector(titlesClass).insertAdjacentHTML(beforeend, link);
    });
  }

  // eslint-disable-next-line no-inner-declarations
  function removeOldTitles() {
    document.querySelector(titlesClass).innerHTML = '';
  }

  // eslint-disable-next-line no-inner-declarations
  function generateTags() {
    const articles = getArticles();
    Object.values(articles).forEach(article => {
      const tags = article.getAttribute(dataTagsAttrubite).split(' ');
      Object.values(tags).forEach(tag => {
        const link = `<li><a href="#tag-${tag}" class="tag active">${tag}</a></li>&nbsp;`;
        article.querySelector(tagsSelector).insertAdjacentHTML(beforeend, link);
      });
    });
  }

  // eslint-disable-next-line no-inner-declarations
  function getArticles() {
    return document.querySelectorAll(postClass);
  }
}