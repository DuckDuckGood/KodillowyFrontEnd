export function parseHour(hour) {
  if (hour && isFinite(hour)) {
    return `${hour}:00`;
  }
  return hour;
}

export function getToday() {
  const date = new Date();
  const parsedYear = date.getFullYear();
  const month = parseInt(date.getMonth()) + 1;
  const parsedMonth = month < 10 ? '0' + month : month;
  const parsedDay = parseInt(date.getDate()) < 10 ? '0' + date.getDate() : date.getDate();
  return `${parsedYear}-${parsedMonth}-${parsedDay}`;
}

export function isBookable(toBook) {
  return toBook
    && toBook.date
    && toBook.duration
    && toBook.hour
    && toBook.id
    && toBook.ppl
    && toBook.repeat !== undefined
    && Array.isArray(toBook.starters)
    && toBook.table;
}