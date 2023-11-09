import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import home from "./routes/home";
import mentions from "./routes/mentions";
import sites from "./routes/sites";
import summary from "./routes/summary";
import timestamps from "./routes/timestamps";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(home, mentions, summary, timestamps, sites);

app.listen(process.env.PORT || 3002, () => console.log(`Server listening`));
