import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import path from "path";

import home from "./routes/home";
import mentions from "./routes/mentions";
import summary from "./routes/summary";
import timestamps from "./routes/timestamps";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(home, mentions, summary, timestamps);

app.listen(process.env.PORT || 3002, () => console.log(`Server listening`));
