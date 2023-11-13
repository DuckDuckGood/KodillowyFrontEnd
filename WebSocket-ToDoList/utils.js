const list = [];

const storeElement = element => {
  list.push({
    id: list.length,
    value: element,
  });
}

const removeElement = ({ id }) => {
  list.splice(
    list.findIndex(elem => parseInt(elem.id) === parseInt(id)),
    1
  );
}

module.exports = { list, storeElement, removeElement };