import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImagesToCloudinary = async (
  images: { imageName: string; path: string }[],
): Promise<Record<string, unknown>[]> => {
  try {
    const uploadPromises = images.map(({ imageName, path }) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          path,
          { public_id: imageName.trim() },
          function (error, result) {
            if (error) {
              reject(error);
            }
            resolve(result as UploadApiResponse);
            // delete a file asynchronously
            fs.unlink(path, (err) => {
              if (err) {
                console.log(`Error deleting file ${path}:`, err);
              } else {
                console.log(`File ${path} deleted successfully.`);
              }
            });
          },
        );
      });
    });
    const results = await Promise.all(uploadPromises);
    return results as Record<string, unknown>[];
  } catch {
    throw new Error('Image upload failed');
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
