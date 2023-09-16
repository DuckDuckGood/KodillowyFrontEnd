export const getFilteredCards = ({cards, searchString}, columnId) => {

  const filterBySearchString = card => {
    if (!searchString || searchString === '') {
      return true;
    }
    return card.title.toUpperCase().includes(searchString.toUpperCase());
  }

  return cards
    .filter(card => card.columnId === columnId)
    .filter(card => filterBySearchString(card));
}

export const getAllColumns = ({columns}) => columns;

export const addColumn = payload => ({type: 'ADD_COLUMN', newColumn: payload});

export const addCard = payload => ({type: 'ADD_CARD', newCard: payload});

export const addSearchString = payload => ({type: 'SET_SEARCH_STRING', searchString: payload});