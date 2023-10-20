import cron from "node-cron";

import { runScraping } from "./scrape";

cron.schedule("0 0,6,12,18 * * *", () => runScraping());
