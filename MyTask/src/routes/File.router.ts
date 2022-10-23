import { Router } from "express";
import FileController from "../controllers/File.controller";
import AuthMiddleware from "../middlewares/Auth.middleware";
import FileUpload from "../middlewares/File.middleware";

const FileRouter = Router();

FileRouter.post(
  "/upload",
  AuthMiddleware,
  FileUpload.single("uploaded_file"),
  FileController.uploadFile
);

FileRouter.get("/list", AuthMiddleware, FileController.listFiles);

FileRouter.get("/:id", AuthMiddleware, FileController.fileById);

FileRouter.get("/download/:id", AuthMiddleware, FileController.downloadFile);

FileRouter.delete("/delete/:id", AuthMiddleware, FileController.deleteFile);

FileRouter.put(
  "/update/:id",
  AuthMiddleware,
  FileUpload.single("uploaded_file"),
  FileController.updateFile
);
export default FileRouter;
