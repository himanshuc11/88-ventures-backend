import "dotenv/config";
import { handler, multerMiddleware } from "./multer.js";
import db from "./db.js";
import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("SERVER RUNNING AT PORT ", PORT);
});

app.post("/upload", multerMiddleware, (req: Request, res: Response) => {
  handler(req, res);
});
