export const cardsReducer = (cards = [], payload) => {
  switch(payload.type) {
    case 'ADD_CARD':
      const newCard = {
        id: cards.length + 1,
        ...payload.newCard,
      }
      return [...cards, newCard]
    case 'TOGGLE_FAVORITE_CARD':
      return cards
        .map(card => {
          if (parseInt(card.id) === parseInt(payload.cardId)) {
            return {...card, favorite: !card.favorite};
          }
          return card;
        });
    case 'REMOVE_CARD':
      return cards.filter(card => parseInt(card.id) !== parseInt(payload.cardId));
    default:
      return cards;
  }
}