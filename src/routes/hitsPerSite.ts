import express, { Request, Response } from "express";

import { client } from "../config";

const router = express.Router();

router.get("/hits-per-site", (request: Request, response: Response) => {
  client.query(
    "SELECT site, COUNT(*) as record_count FROM mentions GROUP BY site ORDER BY record_count DESC;;",
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows);
    },
  );
});

export default router;
