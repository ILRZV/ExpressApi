import { Request, Response, NextFunction } from "express";
import ApiError from "../common/response/error";
const ErrorMiddleware = function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("SFSFFS");
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message });
  }
  return res.status(400).json({ error: err });
  //   if (err instanceof NotFoundDAOError) {
  //     return res.status(400).json(responseCreator.error(err.message));
  //   }
  //   console.error("Unhandled error: " + err);
  //   if (err instanceof Sequelize.ValidationError) {
  //     return res
  //       .status(err.status || 400)
  //       .json(
  //         responseCreator.error(err.errors[0].message || "Something went wrong")
  //       );
  //   }
  //   if (err instanceof Sequelize.Error) {
  //     return res
  //       .status(err.status || 400)
  //       .json(
  //         responseCreator.error(err.original?.detail || "Something went wrong")
  //       );
  //   }
  //   return res
  //     .status(err.status || 500)
  //     .json(responseCreator.error(err.message || "Something went wrong"));
};

export default ErrorMiddleware;
