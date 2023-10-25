fetch("/mentions/neymar/summary")
  .then((response) => response.json())
  .then((data) => createChart(data))
  .catch((error) => console.error("Error:", error));

const createChart = (data) => {
  console.log(data);
};
