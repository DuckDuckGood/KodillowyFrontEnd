import { CREATE_POST, DELETE_POST, UPDATE_POST } from "../../utils/fields";

// const createActionName = actionName => `app/posts/${actionName}`;

const postReducer = (statePart = [], action) => {
  switch (action.type) {
    case DELETE_POST:
      return statePart.filter(post => parseInt(post.id) !== parseInt(action.postId));

    case CREATE_POST:
      const createdPost = action.post;
      createdPost.id = statePart.length + 1;
      return [...statePart, createdPost];

    case UPDATE_POST:
      const updatedPost = action.post;
      const result = statePart.map(post => {
        if (parseInt(post.id) === parseInt(updatedPost.id)) {
          return updatedPost;
        }
        return post;
      });
      return result;

    default:
      return statePart;
  }
};

export default postReducer;