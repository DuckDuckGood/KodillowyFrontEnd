import { CREATE_POST, DELETE_POST } from "./fields";

export const dispatchDeletePost = postId => ({type: DELETE_POST, postId: postId});

export const dispatchCreatePost = post => ({type: CREATE_POST, post: post});