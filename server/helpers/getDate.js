const getDate = () => {
  const date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  const format = hours >= 12 ? 'pm' : 'am';

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes} ${format}`;
};

module.exports = getDate;
