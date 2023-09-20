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

export const getColumnsById = ({columns}, listId) => columns.filter(column => parseInt(column.listId) === parseInt(listId));

export const addColumn = payload => ({type: 'ADD_COLUMN', newColumn: payload});

export const addCard = payload => ({type: 'ADD_CARD', newCard: payload});

export const addList = payload => ({type: 'ADD_LIST', newList: payload});

export const addSearchString = payload => ({type: 'SET_SEARCH_STRING', searchString: payload});

export const getListById = ({lists}, listId) => lists.find(list => parseInt(list.id) === parseInt(listId));

export const getNewListId = ({lists}) => parseInt(lists.length) + 1;