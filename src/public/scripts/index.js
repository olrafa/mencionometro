fetch("/mentions/neymar/summary")
  .then((response) => response.json())
  .then((data) => createChart(data))
  .catch((error) => console.error("Error:", error));

const createChart = (data) => {
  const dates = data.map(({ runHour }) => runHour);
  const firstRun = new Date(Math.min(...dates.map((d) => Date.parse(d))));
  const timestamps = generateTimestamps(firstRun, 6, []);
  console.log(timestamps);
};

const generateTimestamps = (currentDate, intervalHours, items) => {
  if (currentDate >= new Date()) {
    return items;
  }

  items.push(currentDate);
  const cloneDate = new Date(currentDate);
  const nextDate = cloneDate.setHours(cloneDate.getHours() + intervalHours);

  return generateTimestamps(new Date(nextDate), intervalHours, items);
};
