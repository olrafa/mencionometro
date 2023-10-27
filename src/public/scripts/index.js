// eslint-disable-next-line no-undef
const chart = document.getElementById("chart");
// eslint-disable-next-line no-undef
const detail = document.getElementById("detail");

const getData = async (route) => {
  try {
    const response = await fetch(route);
    if (!response.ok) {
      throw new Error("Something went wrong with the request.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

const getIsToday = (timestamp) => {
  const date = new Date(timestamp);

  const currentDate = new Date();

  return (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  );
};

const createEmptyBlock = (element) => {
  // eslint-disable-next-line no-undef
  const emptyBlock = document.createElement("div");
  emptyBlock.className = "run-block";
  element.appendChild(emptyBlock);
};

const createTimeBlocks = (timestamps, summary) => {
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

    // Create empty blocks for the first day of runs.
    const isToday = getIsToday(d);
    if (!isToday && dayRuns.length < 4) {
      const fillerBlocks = 4 - dayRuns.length;
      Array.from({ length: fillerBlocks }, () => createEmptyBlock(dayBlock));
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
      runBlock.addEventListener("mouseenter", () => {
        detail.innerHTML = getTooltipString(dr, mentions);
      });
      runBlock.addEventListener("mouseleave", () => {
        detail.innerHTML = "";
      });
    });

    // Create empty blocks for the remaining runs of the day
    const completeDayBlock = () => {
      if (dayBlock.childElementCount >= 4) {
        return;
      }
      createEmptyBlock(dayBlock);
      completeDayBlock();
    };

    completeDayBlock();
  });
};

const getTooltipString = (runTime, mentions) =>
  `${mentions} ${mentions >= 2 ? "resultados" : "resultado"} em ${new Date(
    runTime
  ).toLocaleString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    hour12: false,
  })}h`;

const createSitesList = (sites) => {
  // eslint-disable-next-line no-undef
  const siteList = document.getElementById("site-list");
  sites.forEach((s) => {
    // eslint-disable-next-line no-undef
    const item = document.createElement("a");
    siteList.appendChild(item);
    item.href = s.url;
    item.innerHTML = s.site;
    item.className = "search-site";
    item.setAttribute("target", "_blank");
    item.setAttribute("rel", "noopener noreferrer");
  });
};

const initialize = async () => {
  const timestamps = await getData("/mentions/neymar/timestamps");
  const summary = await getData("/mentions/neymar/summary");

  timestamps && createTimeBlocks(timestamps, summary);
  const sites = await getData("/sites");
  sites && createSitesList(sites);
};

initialize();
