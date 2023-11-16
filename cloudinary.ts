import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function handleUpload(file: string) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "image",
    folder: process.env.CLOUDINARY_API_FOLDER,
  });
  return res;
}

export default handleUpload;
