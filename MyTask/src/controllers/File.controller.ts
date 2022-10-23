import { Request, Response, NextFunction, RequestHandler } from "express";
import fs from "fs";
import path, { dirname } from "path";
import ApiError from "../common/response/error";
import { getPagination } from "../common/utils/pagination.utils";
import { imageDirName } from "../middlewares/File.middleware";
import { File } from "../models/File.model";
import FileRepository from "../repositories/File.repository";

const imageDirPath = path.resolve(__dirname, "..", "..", imageDirName);

class FileController {
  uploadFile: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.file) {
        const file: File | null = await FileRepository.create({
          userId: req.payload?.userId,
          name: req.file.filename,
          extension: req.file.mimetype.split("/")[1],
          mimetype: req.file.mimetype,
          size: req.file.size,
        });
        return res.status(200).json({ file });
      } else {
        throw ApiError.badRequest("File is not provided");
      }
    } catch (error) {
      return next(error);
    }
  };

  listFiles: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { page, list_size } = req.query;
      const files = await FileRepository.getFiles(
        getPagination(page as string, list_size as string)
      );
      return res.status(200).json({ files });
    } catch (error) {
      return next(error);
    }
  };

  fileById: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = +req.params.id;
      if (!id) throw ApiError.badRequest("Id must be a number");
      const file = await FileRepository.getById(id);
      if (!file) throw ApiError.badRequest("File not found");
      return res.status(200).json(file);
    } catch (error) {
      return next(error);
    }
  };

  deleteFile: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = +req.params.id;
      if (!id) throw ApiError.badRequest("Id must be a number");
      const file = await FileRepository.getById(id);
      if (!file) throw ApiError.badRequest("File not found");
      await FileRepository.delete(id);
      await fs.promises.unlink(path.resolve(imageDirPath, file.name));
      return res.status(200).json(file);
    } catch (error) {
      return next(error);
    }
  };

  updateFile: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = +req.params.id;
      if (req.file) {
        if (!id) throw ApiError.badRequest("Id must be a number");
        const file = await FileRepository.getById(id);
        if (!file) throw ApiError.badRequest("File not found");
        await FileRepository.update(id, {
          userId: req.payload?.userId,
          name: req.file.filename,
          extension: req.file.mimetype.split("/")[1],
          mimetype: req.file.mimetype,
          size: req.file.size,
        });
        await fs.promises.unlink(path.resolve(imageDirPath, file.name));
        return res.status(200).json(file);
      } else {
        throw ApiError.badRequest("File is not provided");
      }
    } catch (error) {
      return next(error);
    }
  };

  downloadFile: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = +req.params.id;
      if (!id) throw ApiError.badRequest("Id must be a number");
      const file = await FileRepository.getById(id);
      if (!file) throw ApiError.badRequest("File not found");
      const filePath = path.resolve(imageDirPath, file.name);
      res.download(filePath);
    } catch (error) {
      return next(error);
    }
  };
}

export default new FileController();
