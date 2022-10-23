import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => any;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const imageDirName = "uploads";

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Uploaded file is not image"));
  }
};

const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, imageDirName);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    callback(null, `${Date.now()}-app-${file.originalname}`);
  },
});

const FileUpload = multer({ storage, fileFilter });

export default FileUpload;
