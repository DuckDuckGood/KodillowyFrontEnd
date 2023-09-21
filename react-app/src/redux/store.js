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
      
    case 'ADD_LIST':
      const newList = {
        id: state.lists.length + 1,
        ...payload.newList,
      }
      return {...state, lists: [...state.lists, newList]}

      case 'TOGGLE_FAVORITE_CARD':
        const cards = state.cards;
        cards
          .filter(card => parseInt(card.id) === parseInt(payload.cardId))
          .map(card => card.favorite = !card.favorite);
        return {...state, cards: cards}

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