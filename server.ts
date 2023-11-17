import "dotenv/config";
import { handler, multerMiddleware } from "./multer.js";
import db from "./db.js";
import cors from "cors";
import express from "express";
import { projects } from "./schema.js";
import type { Request, Response } from "express";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("SERVER RUNNING AT PORT ", PORT);
});

app.post("/upload", multerMiddleware, async (req: Request, res: Response) => {
  try {
    const uploadedImage = await handler(req, res);
    const url = uploadedImage?.url;
    const projectName = req.body.name;

    if (!url) {
      throw new Error("Could not upload to cloudinary");
    }
    if (!projectName) {
      throw new Error("name for projectName is required");
    }

    const dbInsert = await db
      .insert(projects)
      .values({
        image: url,
        name: projectName,
      })
      .returning();

    res.json(dbInsert?.[0]);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    console.log(error);
    res.send({
      message: JSON.stringify(error),
    });
  }
});

app.get("/", async (req: Request, res: Response) => {
  try {
    const images = await db.select().from(projects);
    res.json(images);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    console.log(error);
    res.send({
      message: JSON.stringify(error),
    });
  }
});
