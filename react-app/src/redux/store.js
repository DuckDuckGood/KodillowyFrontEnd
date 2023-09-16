import { createStore } from 'redux';
import initialState from './initialState';

const reducer = (state, payload) => {
  console.log(payload);
  switch (payload.type) {
    case 'ADD_COLUMN':
      const newColumn = {
        id: state.columns.length + 1,
        ...payload.newColumn,
      }
      return {...state, columns: [...state.columns, newColumn]}

    case 'ADD_CARD':
      const newCard = {
        id: state.cards.length + 1,
        ...payload.newCard,
      }
      return {...state, cards: [...state.cards, newCard]}

    case 'SET_SEARCH_STRING':
      return {...state, searchString: payload.searchString}
      
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;