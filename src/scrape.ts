/* eslint-disable no-console */
import { launch } from "puppeteer";

import { client } from "./config";
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

    if (itemFound) {
      console.log(`${searchTerm} found on ${name}.`);
      client.query(
        "INSERT INTO mentions (site) VALUES ($1)",
        [name],
        (error) => {
          if (error) {
            throw error;
          } else {
            console.log("Mention added.");
          }
        },
      );
    } else {
      console.log(`${searchTerm} not found on ${name}.`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error scraping ${name}: ${error.message}`);
  } finally {
    await browser.close();
  }
};

export const runScraping = async () => {
  for (const { name, url } of WEBSITES) {
    await scrapeWebsiteForTerm(name, url, SEARCH_TERM);
  }
};
