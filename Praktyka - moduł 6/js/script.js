import { generateTags, generateTitles, tagClickHandler, getTags, generateAuthors, getAuthors, authorClickHandler } from './functions.js';
'use strict';
{
  generateTitles();
  generateTags();
  const tags = getTags();
  tags.forEach(tag => tag.addEventListener('click', tagClickHandler));

  generateAuthors();
  const authors = getAuthors();
  authors.forEach(author => author.addEventListener('click', authorClickHandler));
}