"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
exports.client = new pg_1.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca: (_a = process.env.DB_CA) === null || _a === void 0 ? void 0 : _a.toString(),
    },
});
exports.client.connect(function (err) {
    if (err)
        throw err;
    exports.client.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            throw err;
        console.log(result.rows[0].version);
    });
});
//# sourceMappingURL=config.js.map