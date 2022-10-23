import Joi from "joi";
import ApiError from "../../common/response/error";
import joiErrorTranscription from "./JoiErrorTranscription";
import { Request, Response, NextFunction } from "express";

const passwordRegExp = new RegExp("^[a-zA-Z0-9]{8,20}$");
const phoneRegExp = new RegExp("^[+]?[0-9]{7,14}$");

function userValidator(data: any) {
  const schema = Joi.object({
    identity: Joi.alternatives().try(
      Joi.string().email().required(),
      Joi.string().pattern(phoneRegExp).required()
    ),
    password: Joi.string().pattern(passwordRegExp).required(),
  });
  return schema.validate(data);
}

function refreshTokenValidator(data: any) {
  const schema = Joi.object({
    refreshToken: Joi.string().min(7).max(250),
  });
  return schema.validate(data);
}

export const UserInfoValidator = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = userValidator(req.body);
  if (error) {
    return next(ApiError.badRequest(joiErrorTranscription(error)));
  }
  next();
};

export const RefreshTokenValidator = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = refreshTokenValidator(req.body);
  if (error) {
    return next(ApiError.badRequest(joiErrorTranscription(error)));
  }
  next();
};
