import express, { Request, Response } from "express";

import { client } from "../config";

const router = express.Router();

router.get("/news", (request: Request, response: Response) => {
  const { date } = request.query;

  client.query(
    "SELECT * FROM stories WHERE DATE(created_at) = $1",
    [date],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json(results.rows);
    },
  );
});

export default router;
