import express, { Request, Response } from "express";

import { client } from "../config";

const router = express.Router();

router.get("/sites", (request: Request, response: Response) => {
  client.query("SELECT * FROM sites ORDER BY site ", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
});

export default router;
