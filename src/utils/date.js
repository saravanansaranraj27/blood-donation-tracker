const MONTH_INDEX = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

export function parseDate(dateString) {
  const [day, month, year] = dateString.split(" ");
  return new Date(Number(year), MONTH_INDEX[month], Number(day));
}
