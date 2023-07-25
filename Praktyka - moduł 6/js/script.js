'use strict';
{
  const post = '.post';
  const postTitle = '.post-title';
  const titles = '.titles';

  const eventHandler = function(event) {
    event.preventDefault();
    const clicked = this;
    const activeElements = document.getElementsByClassName('active');
    Object.entries(activeElements).forEach(el => el[1].classList.remove('active'));

    const id = clicked.getAttribute('href').replace('#', '');

    clicked.classList.add('active');
    document.getElementById(id).classList.add('active');
  };

  document.querySelector(titles).innerHTML = '';

  const articles = document.querySelectorAll(post);
  Object.values(articles).forEach(article => {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(postTitle).innerHTML;
    const link = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    document.querySelector(titles).insertAdjacentHTML('beforeend', link);
  });

  const selectors = document.querySelectorAll('.titles > li > a');
  selectors.forEach(selector => selector.addEventListener('click', eventHandler));
}