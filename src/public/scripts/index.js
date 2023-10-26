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
  // const maxCount = Math.max(...summary.map((s) => s.mentions));
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
      const runData = summary.find(
        (s) => new Date(s.runHour).toUTCString() === new Date(dr).toUTCString()
      );

      const { color = "#161b22" } = runData || {};

      // eslint-disable-next-line no-undef
      const runBlock = document.createElement("div");
      dayBlock.appendChild(runBlock);
      runBlock.className = "run-block";
      runBlock.style.backgroundColor = color;
    });
  });
};

const initialize = async () => {
  const timestamps = await getData("timestamps");
  const summary = await getData("summary");
  timestamps && createTimeBlocks(timestamps, summary);
};

initialize();
