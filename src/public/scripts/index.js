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
  const days = timestamps.map((ts) => new Date(ts).setHours(0, 0, 0, 0));
  const uniqueDays = [...new Set(days)].map((d) => new Date(d));
  uniqueDays.forEach((d, i) => {
    // eslint-disable-next-line no-undef
    const dayBlock = document.createElement("div");
    chart.appendChild(dayBlock);
    dayBlock.className = "time-block";
    const dayRuns = timestamps.filter(
      (ts) =>
        new Date(new Date(ts).setHours(0, 0, 0, 0)).toString() === d.toString()
    );

    const createEmptyBlock = () => {
      // eslint-disable-next-line no-undef
      const emptyBlock = document.createElement("div");
      emptyBlock.className = "run-block";
      dayBlock.appendChild(emptyBlock);
    };

    // Workaround to get blocks of the first day aligned with the others;
    // Remove this when first scraping day is not returned anymore.
    if (!i) {
      createEmptyBlock();
      createEmptyBlock();
    }

    dayRuns.forEach((dr) => {
      const runData = summary.find(
        (s) => new Date(s.runHour).toUTCString() === new Date(dr).toUTCString()
      );

      const { color = "#161b22", mentions = 0 } = runData || {};

      // eslint-disable-next-line no-undef
      const runBlock = document.createElement("div");
      dayBlock.appendChild(runBlock);
      runBlock.className = "run-block";
      runBlock.style.backgroundColor = color;
      runBlock.setAttribute("data-tooltip", getTooltipString(dr, mentions));
    });

    const completeDayBlock = () => {
      if (dayBlock.childElementCount >= 4) {
        return;
      }
      createEmptyBlock();
      completeDayBlock();
    };

    completeDayBlock();
  });
};

const getTooltipString = (runTime, mentions) =>
  `${mentions} resultados em ${new Date(
    runTime
  ).toLocaleString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    hour12: false,
  })} horas`;

const initialize = async () => {
  const timestamps = await getData("timestamps");
  const summary = await getData("summary");
  timestamps && createTimeBlocks(timestamps, summary);
};

initialize();
