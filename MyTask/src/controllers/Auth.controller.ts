import { Request, Response, NextFunction, RequestHandler } from "express";
import { TokenResponse } from "../common/interfaces/Token.interfaces";
import { User } from "../models/User.model";
import UserRepository from "../repositories/User.repository";
import TokenUtils from "../common/utils/token.utils";

class AuthController {
  signUp: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { identity, password } = req.body;
      const user: User = await UserRepository.createUser({
        identity,
        password,
      });
      const tokens: TokenResponse = await TokenUtils.generateTokens({
        userId: user.id,
        identity: identity,
      });
      return res.status(200).json(tokens);
    } catch (error) {
      return next(error);
    }
  };

  signIn: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { identity, password } = req.body;
      const user: User | null = await UserRepository.getUserByIdentity(
        identity
      );
      if (user && user.password === password) {
        const tokens: TokenResponse = await TokenUtils.generateTokens({
          userId: user.id,
          identity: identity,
        });
        return res.status(200).json(tokens);
      }
      return res.status(200).json({ message: "User was not found" });
    } catch (error) {
      return next(error);
    }
  };

  info: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.status(200).json({ identity: req.payload?.identity });
    } catch (error) {
      return next(error);
    }
  };

  newTokenByRefresh: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { refreshToken } = req.body;
      const tokens = await TokenUtils.createTokensByRefresh(refreshToken);
      return res.status(200).json(tokens);
    } catch (error) {
      return next(error);
    }
  };

  logOut: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.payload?.userId;
      await TokenUtils.deleteAllRefreshTokensCreatedByUser(userId);
      return res.status(200).json({ message: "Logout completed" });
    } catch (error) {
      return next(error);
    }
  };
}

export default new AuthController();
// export const createUser: RequestHandler = async (req, res, next) => {
//   var user = await UserRepository.createUser(req);
//   return res
//     .status(200)
//     .json({ message: "User created successfully", data: user });
// };

// export const getAllUsers: RequestHandler = async (req, res, next) => {
//   const allTodos: User[] = await User.findAll();
//   return res
//     .status(200)
//     .json({ message: "Users fetched successfully", data: allTodos });
// };

// export const getUserById: RequestHandler = async (req, res, next) => {
//   const { id } = req.params;
//   const todos: User | null = await User.findByPk(id);
//   return res
//     .status(200)
//     .json({ message: "User fetched successfully", data: todos });
// };
