import { Router } from "express";
import AuthController from "../controllers/Auth.controller";
import AuthMiddleware from "../middlewares/Auth.middleware";
import {
  RefreshTokenValidator,
  UserInfoValidator,
} from "../middlewares/ValidationMiddlewares/Auth.validation";

const AuthRouter = Router();

AuthRouter.post("/signup", UserInfoValidator, AuthController.signUp);

AuthRouter.post(
  "/signin/new_token",
  RefreshTokenValidator,
  AuthController.newTokenByRefresh
);

AuthRouter.post("/signin", UserInfoValidator, AuthController.signIn);

AuthRouter.get("/info", AuthMiddleware, AuthController.info);

AuthRouter.get("/logout", AuthMiddleware, AuthController.logOut);

export default AuthRouter;
