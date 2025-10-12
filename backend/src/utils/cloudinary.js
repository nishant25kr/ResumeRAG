import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from "path"
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        console.log("Uploading:", localFilePath);

        const ext = path.extname(localFilePath).toLowerCase();
        const isImage = [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: isImage ? "image" : "raw",
        });

        console.log("Upload successful:", response);

        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
        return null;
    }
};

export { uploadOnCloudinary };
