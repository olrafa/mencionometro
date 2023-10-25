// eslint-disable-next-line no-undef
const chart = document.getElementById("chart");

const getData = async (route) => {
  try {
    const response = await fetch(`/mentions/neymar/${route}`);
    if (!response.ok) {
      throw new Error("Something went wrong with the request.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

const createTimeBlocks = (timestamps, summary) => {
  const maxCount = Math.max(...summary.map((s) => s.mentions));
  const days = timestamps.map((ts) => new Date(ts).setHours(0, 0, 0, 0));
  const uniqueDays = [...new Set(days)].map((d) => new Date(d));
  uniqueDays.forEach((d) => {
    // eslint-disable-next-line no-undef
    const dayBlock = document.createElement("div");
    chart.appendChild(dayBlock);
    dayBlock.className = "time-block";
    const dayRuns = timestamps.filter(
      (ts) =>
        new Date(new Date(ts).setHours(0, 0, 0, 0)).toString() === d.toString()
    );
    dayRuns.forEach((dr) => {
      // eslint-disable-next-line no-undef
      const runBlock = document.createElement("div");
      dayBlock.appendChild(runBlock);
      runBlock.className = "run-block";
      const mentionCount =
        summary.find((s) => s.runHour.toString() === new Date(dr).toString())
          ?.mentions || 0;

      runBlock.style.backgroundColor = mentionCount
        ? calculateColors(mentionCount, maxCount)
        : "#161b22";
    });
  });
};

const colors = ["#0e4429", "#006d32", "#26a641", "#39d353"];

const calculateColors = (value, maxValue) => {
  const minValue = 1;
  const ratio = (value - minValue) / (maxValue - minValue);

  // Determine the index in the array based on the ratio
  const index = Math.min(Math.floor(ratio * colors.length), colors.length - 1);

  // Get the color from the array at the determined index
  const selectedColor = colors[index];

  // Return the selected color
  return selectedColor;
};

const initialize = async () => {
  const timestamps = await getData("timestamps");
  const summary = await getData("summary");
  timestamps && createTimeBlocks(timestamps, summary);
};

initialize();
