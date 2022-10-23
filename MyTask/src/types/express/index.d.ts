import express from "express";
import { AccessTokenPayload } from "../../common/interfaces/Token.interfaces";

declare global {
  namespace Express {
    interface Request {
      payload: AccessTokenPayload;
    }
  }
}
