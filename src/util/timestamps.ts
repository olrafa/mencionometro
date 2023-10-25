export const roundFirstDate = (date: Date): Date => {
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export const generateTimestamps = (
  currentDate: Date,
  intervalHours: number,
  items: Date[],
): Date[] => {
  if (currentDate >= new Date()) {
    return items;
  }

  items.push(currentDate);
  const cloneDate = new Date(currentDate);
  const nextDate = cloneDate.setHours(cloneDate.getHours() + intervalHours);

  return generateTimestamps(new Date(nextDate), intervalHours, items);
};
