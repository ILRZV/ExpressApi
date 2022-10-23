import { Request, Response, NextFunction } from "express";
import ApiError from "../common/response/error";
import TokenUtils from "../common/utils/token.utils";

const AuthMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const head = req.headers.authorization?.split(" ")[0];
    if (!token || head !== "Bearer") {
      next(ApiError.unauthorized("Unauthorized"));
    } else {
      req.payload = TokenUtils.verifyAccessToken(token);
      next();
    }
  } catch (err) {
    next(ApiError.unauthorized("Unauthorized"));
  }
};
export default AuthMiddleware;
