import express, { Request, Response } from "express";

import { client } from "../config";
import { generateTimestamps, roundFirstDate } from "../util/timestamps";

const router = express.Router();

router.get(
  "/mentions/:word/timestamps",
  (request: Request, response: Response) => {
    const { word } = request.params;

    client.query(
      "SELECT * FROM mentions WHERE LOWER(searchTerm) = LOWER($1) ORDER BY created_at LIMIT 1",
      [word],
      (error, results) => {
        if (error) {
          throw error;
        }

        const [firstResult] = results.rows;

        const { created_at: runTimestamp } = firstResult;

        const runDate = new Date(runTimestamp);
        const roundDate = roundFirstDate(runDate);
        const timestamps = generateTimestamps(roundDate, 6, []);
        response.status(200).json(timestamps);
      },
    );
  },
);

export default router;
