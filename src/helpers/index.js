export const formatQuantity = quantity => {
  return Number(quantity).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });
};

export const formatDate = date => {
  const newDate = new Date(date);

  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };
  return newDate.toLocaleDateString('es-AR', options);
};

export const formatHours = hour => {
  const newHour = new Date(hour);

  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };

  return newHour.toLocaleTimeString('es-AR', options);
};
