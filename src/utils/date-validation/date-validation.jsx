export const minDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return minDate;
};

export const isDateAfterTomorrow = (value) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const selectedDate = new Date(value);

  return selectedDate >= tomorrow
    ? undefined
    : "Date must be at least one day after today";
};
