import { createTimeBlocks } from "./functions/chart.mjs";
import { getData } from "./functions/data.mjs";

const createSitesList = (sites) => {
  // eslint-disable-next-line no-undef
  const siteList = document.getElementById("site-list");
  sites.forEach((s) => {
    // eslint-disable-next-line no-undef
    const item = document.createElement("div");
    siteList.appendChild(item);
    item.innerHTML = s.site;
    item.className = "search-site";
  });
};

const initialize = async () => {
  const sites = await getData("/sites");
  sites && createSitesList(sites);

  const timestamps = await getData("/mentions/neymar/timestamps");
  const summary = await getData("/mentions/neymar/summary");

  timestamps && createTimeBlocks(timestamps, summary);
};

initialize();
