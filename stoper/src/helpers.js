export const select = {
  hours: 'hours',
  minutes: 'minutes',
  seconds: 'seconds',
  miliseconds: 'miliseconds',
};

export function updateTime(newTime) {
  const time = parseInt(newTime);

  const miliseconds = time % 1000;
  const seconds = parseInt(time / 1000) % 60;
  const minutes = parseInt(seconds / (1000 * 60)) % 60;
  const hours = parseInt(minutes / (1000 * 60 * 60)) % 24;

  document.getElementById(select.miliseconds).innerHTML = parseMiliseconds(miliseconds);
  document.getElementById(select.seconds).innerHTML = parseDigit(seconds);
  document.getElementById(select.minutes).innerHTML = parseDigit(minutes);
  document.getElementById(select.hours).innerHTML = parseDigit(hours);
}

const parseDigit = toParse => {
  if (parseInt(toParse) < 10) {
    return `0${toParse}`;
  }

  return toParse;
}

const parseMiliseconds = toParse => {
  let parsed = toParse;
  if (parseInt(parsed) < 10) {
    parsed = `0${parsed}`;
  }
  if (parseInt(parsed) < 100) {
    parsed = `0${parsed}`;
  }
  return parsed;
}