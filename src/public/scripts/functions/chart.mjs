import { getIsToday } from "./util.mjs";

// eslint-disable-next-line no-undef
const chart = document.getElementById("chart");
// eslint-disable-next-line no-undef
const detail = document.getElementById("detail");

const createEmptyBlock = (element) => {
  // eslint-disable-next-line no-undef
  const emptyBlock = document.createElement("div");
  emptyBlock.className = "run-block";
  element.appendChild(emptyBlock);
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

const completeIncompleteDays = (day, dayRuns, dayBlock) => {
  // Create empty blocks for the first day of runs.
  const isToday = getIsToday(day);
  if (!isToday && dayRuns.length < 4) {
    const fillerBlocks = 4 - dayRuns.length;
    Array.from({ length: fillerBlocks }, () => createEmptyBlock(dayBlock));
  }
};

const addBlocks = (summary, dayRun, dayBlock) => {
  const runData = summary.find(
    (s) => new Date(s.runHour).toUTCString() === new Date(dayRun).toUTCString()
  );

  const { color = "#161b22", mentions = 0, sites = [] } = runData || {};

  // eslint-disable-next-line no-undef
  const runBlock = document.createElement("div");
  dayBlock.appendChild(runBlock);
  runBlock.className = "run-block";
  runBlock.style.backgroundColor = color;

  const siteNameElements = Array.from(
    // eslint-disable-next-line no-undef
    document.querySelectorAll(".search-site")
  );

  const resultSites = siteNameElements.filter(({ innerHTML }) =>
    sites.includes(innerHTML)
  );
  addEvents(runBlock, dayRun, mentions, resultSites);
};

const addEvents = (runBlock, dayRun, mentions, resultSites) => {
  ["mouseenter", "touchstart"].map((event) =>
    runBlock.addEventListener(event, () => {
      detail.innerHTML = getTooltipString(dayRun, mentions);
      resultSites.forEach((rs) => {
        rs.classList.add("site-result");
      });
    })
  );

  ["mouseleave", "touchend"].map((event) =>
    runBlock.addEventListener(event, () => {
      detail.innerHTML = "";
      resultSites.forEach((rs) => {
        rs.classList.remove("site-result");
      });
    })
  );
};

const fillDay = (day, timestamps, summary) => {
  // eslint-disable-next-line no-undef
  const dayBlock = document.createElement("div");
  chart.appendChild(dayBlock);
  dayBlock.className = "time-block";
  const dayRuns = timestamps.filter(
    (ts) =>
      new Date(new Date(ts).setHours(0, 0, 0, 0)).toString() === day.toString()
  );

  completeIncompleteDays(day, dayRuns, dayBlock);

  dayRuns.forEach((dr) => addBlocks(summary, dr, dayBlock));

  // Create empty blocks for the remaining runs of the day
  const completeDayBlock = () => {
    if (dayBlock.childElementCount >= 4) {
      return;
    }
    createEmptyBlock(dayBlock);
    completeDayBlock();
  };

  completeDayBlock();
};

export const createTimeBlocks = (timestamps, summary) => {
  const days = timestamps.map((ts) => new Date(ts).setHours(0, 0, 0, 0));
  const uniqueDays = [...new Set(days)].map((d) => new Date(d));
  uniqueDays.forEach((d) => fillDay(d, timestamps, summary));
};
