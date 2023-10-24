import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";

import { client } from "./config";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

const getMentions = (request: Request, response: Response) => {
  client.query("SELECT * FROM mentions", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

/* app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public"));
}); */

app.get("/", (req, res) => {
  res.send("Neymarmeter is live");
});

app.route("/mentions").get(getMentions);

app.listen(process.env.PORT || 3002, () => console.log(`Server listening`));
