import { CREATE_POST, DELETE_POST } from "../../utils/fields";

// const createActionName = actionName => `app/posts/${actionName}`;

const postReducer = (statePart = [], action) => {
  switch (action.type) {
    case DELETE_POST:
      return statePart.filter(post => parseInt(post.id) !== parseInt(action.postId));
    case CREATE_POST:
      const post = action.post;
      post.id = statePart.length + 1;
      return [...statePart, post];
    default:
      return statePart;
  }
};

export default postReducer;