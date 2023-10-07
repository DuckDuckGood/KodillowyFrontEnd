export const setStartDate = (editingPost, callback, property) => {
  const startingDate = new Date();

  if (!editingPost || !property) {
    callback(startingDate);
  } else {

    const dateFragments = property.split('.');

    if (dateFragments.length !== 3
          || !isFinite(dateFragments[0])
          || !isFinite(dateFragments[1])
          || !isFinite(dateFragments[2])) {
            callback(startingDate);
    } else {
      setDateFromFragments(startingDate, dateFragments)
      callback(startingDate);
    }
  }
}

const parsedNumberFormat = toParse => {
  console.log(toParse);
  if (isFinite(toParse) && parseInt(toParse) < 10) {
    return `0${toParse}`;
  }
  return toParse;
}

export const changeDate = (changedDate, datePickerCallback, publishedCallback) => {
  const date = new Date(changedDate);
  datePickerCallback(date);
  const parsedDate = `${parsedNumberFormat(date.getDate())}.${parsedNumberFormat(date.getMonth()+1)}.${parsedNumberFormat(date.getFullYear())}`;
  publishedCallback(parsedDate);
}

export const getStartingValue = (editingPost, property) => {
  return editingPost ? property : '';
}

export const setDateFromFragments = (dateToSet, dateFragments = []) => {
  if (dateToSet && dateFragments && dateFragments.length === 3) {
    dateToSet.setDate(dateFragments[0]);
    dateToSet.setMonth(parseInt(dateFragments[1]) - 1);
    dateToSet.setFullYear(dateFragments[2]);
  }
}

const isNotAfter = (shouldBeBefore, shouldBeAfter) => {
  const dateBefore = new Date(shouldBeBefore);
  const dateAfter = new Date(shouldBeAfter);
  
  return !(dateBefore > dateAfter);
}

export const correctDate = validatedDate => {
  if (!validatedDate) {
    return false;
  }

  return isNotAfter(validatedDate, new Date());
}