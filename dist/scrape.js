"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runScraping = void 0;
/* eslint-disable no-console */
const puppeteer_1 = require("puppeteer");
const config_1 = require("./config");
const constants_1 = require("./constants");
const scrapeWebsiteForTerm = (mediaOutlet, url, searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield (0, puppeteer_1.launch)({ headless: "new" });
    const page = yield browser.newPage();
    try {
        console.log("Searching on", mediaOutlet);
        // Navigate to the URL
        yield page.goto(url);
        // Extract the page content and check if the term is present
        const pageContent = yield page.content();
        const itemFound = pageContent.includes(searchTerm);
        if (itemFound) {
            console.log(`${searchTerm} found on ${mediaOutlet}.`);
            config_1.client.query("INSERT INTO mentions (searchTerm, site) VALUES ($1, $2)", [searchTerm, mediaOutlet], (error) => {
                if (error) {
                    throw error;
                }
                else {
                    console.log("Mention added.");
                }
            });
        }
        else {
            console.log(`${searchTerm} not found on ${mediaOutlet}.`);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.error(`Error scraping ${mediaOutlet}: ${error.message}`);
    }
    finally {
        yield browser.close();
    }
});
const runScraping = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const searchTerm of constants_1.SEARCH_TERMS) {
        for (const { mediaOutlet, url } of constants_1.WEBSITES) {
            yield scrapeWebsiteForTerm(mediaOutlet, url, searchTerm);
        }
    }
    console.log("Search finished at", new Date());
});
exports.runScraping = runScraping;
//# sourceMappingURL=scrape.js.map