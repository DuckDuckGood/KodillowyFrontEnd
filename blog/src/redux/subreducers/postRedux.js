const createActionName = actionName => `app/posts/${actionName}`;

const postReducer = (statePart = [], action) => {
  switch (action.type) {
    default:
      return statePart;
  }
};

export default postReducer;