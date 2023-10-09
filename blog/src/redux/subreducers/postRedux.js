import { CREATE_POST_EVENT, DELETE_POST_EVENT, UPDATE_POST_EVENT } from "../../utils/fields";

const postReducer = (statePart = [], action) => {
  switch (action.type) {
    case DELETE_POST_EVENT:
      return statePart.filter(post => parseInt(post.id) !== parseInt(action.postId));

    case CREATE_POST_EVENT:
      const createdPost = action.post;
      createdPost.id = statePart.length + 1;
      return [...statePart, createdPost];

    case UPDATE_POST_EVENT:
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