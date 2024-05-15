import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";

config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadFilesToCloudinary = async (files) => {
  console.log(files);
  try {
    const uploadPromises = files.map(async (file) => {
      const { filePath, folderName } = file;
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folderName,
        resource_type: "auto",
        overwrite: true,
        invalidate: true,
      });
      return result;
    });

    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.log(error);
    throw new Error("Could not upload files to cloudinary");
  }
};

export { cloudinary, uploadFilesToCloudinary };
