export const getAllPosts = ({posts}) => posts;

export const getPostById = ({posts}, id) => posts.find(post => parseInt(post.id) === parseInt(id));

export const getCategories = ({categories}) => categories;

export const getSelectedCategory = ({selectedCategory}) => selectedCategory;