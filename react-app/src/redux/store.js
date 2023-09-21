import { combineReducers, createStore } from 'redux';
import initialState from './initialState';

import { listsReducer } from './reducers/listsReducer';
import { columnsReducer } from './reducers/columnsReducer';
import { cardsReducer } from './reducers/cardsReducer';
import { searchStringReducer } from './reducers/searchStringReducer';

const subreducers = {
  lists: listsReducer,
  columns: columnsReducer,
  cards: cardsReducer,
  searchString: searchStringReducer,
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;