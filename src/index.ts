import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import cron from "node-cron";

import { client } from "./config";
import { runScraping } from "./scrape";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const getMentions = (request: Request, response: Response) => {
  client.query("SELECT * FROM mentions", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addMention = (request: Request, response: Response) => {
  const { site } = request.body;

  client.query("INSERT INTO mentions (site) VALUES ($1)", [site], (error) => {
    if (error) {
      throw error;
    }
    response.status(201).json({ status: "success", message: "Mention added." });
  });
};

app.route("/mentions").get(getMentions).post(addMention);

cron.schedule("0 0,6,12,18 * * *", () => runScraping());
// cron.schedule("* * * * *", () => runScraping());

app.listen(process.env.PORT || 3002, () => console.log(`Server listening`));
