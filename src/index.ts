/* eslint-disable no-console */
import { launch } from "puppeteer";

import { SEARCH_TERM, WEBSITES } from "./constants";

const scrapeWebsiteForTerm = async (
  name: string,
  url: string,
  searchTerm: string,
) => {
  const browser = await launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    console.log("Searching on", name);
    // Navigate to the URL
    await page.goto(url);

    // Extract the page content and check if the term is present
    const pageContent = await page.content();

    const itemFound = pageContent.includes(searchTerm);

    console.log(
      itemFound
        ? `${searchTerm} found on ${name} at ${new Date()}`
        : `${searchTerm} not found on ${name}.`,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error scraping ${name}: ${error.message}`);
  } finally {
    await browser.close();
  }
};

const runScraping = async () => {
  for (const { name, url } of WEBSITES) {
    await scrapeWebsiteForTerm(name, url, SEARCH_TERM);
  }
};

runScraping().then(() => console.log("All websites searched."));
