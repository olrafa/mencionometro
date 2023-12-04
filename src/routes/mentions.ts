import express, { Request, Response } from "express";

import { client } from "../config";

const router = express.Router();

router.get("/mentions", (request: Request, response: Response) => {
  client.query(
    "SELECT * FROM mentions WHERE created_at >= CURRENT_DATE - INTERVAL '30 days';",
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows);
    },
  );
});

export default router;
