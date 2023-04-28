export const dateByDefault = (dayDelay = 0) => {
  const date = new Date();

  date.setDate(date.getDate() + dayDelay);

  const formated = new Intl.DateTimeFormat('uk-UK', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  return formated.replace(',', '');
};

export const configureDate = (receivedDate: number | Date | undefined) => {
  return new Intl.DateTimeFormat('uk-UK', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(receivedDate).replace(',', '');
};

export const getDateForm = (date: Date) => {
  return date.toLocaleString('uk-UK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',', '');
};

export const getDateForInput = (date: Date) => {
  return date.toLocaleString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
