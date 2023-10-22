"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const config_1 = require("./config");
const scrape_1 = require("./scrape");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
const getMentions = (request, response) => {
    config_1.client.query("SELECT * FROM mentions", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
app.get("/", (req, res) => {
    res.send("Neymarmeter is live");
});
app.route("/mentions").get(getMentions);
node_cron_1.default.schedule("0 0,6,12,18 * * *", () => (0, scrape_1.runScraping)());
// cron.schedule("* * * * *", () => runScraping());
app.listen(process.env.PORT || 3002, () => console.log(`Server listening`));
//# sourceMappingURL=index.js.map