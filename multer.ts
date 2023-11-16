import multer from "multer";
import type { Request, Response } from "express";
import handleUpload from "./cloudinary.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const multerMiddleware = upload.single("image");

const handler = async (req: Request, res: Response) => {
  try {
    if (!req?.file?.buffer) {
      throw new Error("req.file.buffer is required");
    }
    if (!req?.file?.mimetype) {
      throw new Error("req.file.mimetype is required");
    }
    const b64 = Buffer.from(req?.file?.buffer).toString("base64");
    let dataURI = "data:image/jpeg;base64," + b64;
    const cldRes = await handleUpload(dataURI);
    console.log(cldRes);
    res.json(cldRes);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    console.log(error);
    res.send({
      message: JSON.stringify(error),
    });
  }
};
export { handler, multerMiddleware };
