const dateSettings: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

export const formatDate = (
  receivedDate: Date = new Date(),
  dayDelay = 0,
) => {
  const date = new Date(receivedDate);

  date.setDate(date.getDate() + dayDelay);

  return new Intl.DateTimeFormat('uk-UK', dateSettings)
    .format(date)
    .replace(',', '');
};

export const getDateForInput = (date: Date) => {
  return date.toLocaleString('sv-SE', dateSettings);
};

export function convertToDate(
  dateString: Date | string,
  timezoneOffset = 0,
) {
  const dateParts = dateString.split(/[.: ]/);
  const [day, month, year, hour, minute] = dateParts;
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute));

  date.setMinutes(date.getMinutes() - timezoneOffset);
  const formattedDate = date.toISOString().slice(0, 16);

  return formattedDate;
}
