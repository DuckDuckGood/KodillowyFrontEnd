import { combineReducers, createStore } from "redux";
import { initialState } from "./initialState";
import postReducer from "./subreducers/postRedux";

const defaultReducer = state => state || {};

const subReducers = {
  posts: postReducer,
  categories: defaultReducer,
};

const reducer = combineReducers(subReducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;