import "dotenv/config";
import cloudinary from "./cloudinary.js";
import express, { Application } from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  cloudinary.uploader.upload(
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" },
    function (error, result) {
      console.log(result);
    }
  );
});
