import { CREATE_POST_EVENT, DELETE_POST_EVENT, SELECT_CATEGORY, UPDATE_POST_EVENT } from "./fields";

export const dispatchDeletePost = postId => ({type: DELETE_POST_EVENT, postId: postId});

export const dispatchCreatePost = post => ({type: CREATE_POST_EVENT, post: post});

export const dispatchUpdatePost = post => ({type: UPDATE_POST_EVENT, post: post});

export const dispatchSelectCategory = category => ({type: SELECT_CATEGORY, category: category});