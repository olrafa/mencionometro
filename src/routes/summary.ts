import express, { Request, Response } from "express";

import { client } from "../config";
import { Mention } from "../types";
import { summarizeData } from "../util/summarizeData";

const router = express.Router();

router.get(
  "/mentions/:word/summary",
  (request: Request, response: Response) => {
    const { word } = request.params;

    client.query(
      "SELECT * FROM mentions WHERE LOWER(searchTerm) = LOWER($1)",
      [word],
      (error, results) => {
        if (error) {
          throw error;
        }

        const data: Mention[] = results.rows;
        const summary = summarizeData(data);
        response.status(200).json(summary);
      },
    );
  },
);

export default router;
