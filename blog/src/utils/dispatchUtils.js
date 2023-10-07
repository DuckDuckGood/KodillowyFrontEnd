import { CREATE_POST_EVENT, DELETE_POST_EVENT, UPDATE_POST_EVENT } from "./fields";

export const dispatchDeletePost = postId => ({type: DELETE_POST_EVENT, postId: postId});

export const dispatchCreatePost = post => ({type: CREATE_POST_EVENT, post: post});

export const dispatchUpdatePost = post => ({type: UPDATE_POST_EVENT, post: post});