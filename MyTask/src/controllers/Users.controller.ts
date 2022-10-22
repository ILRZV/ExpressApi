import { RequestHandler } from "express";
import { User } from "../models/User.model";
import UserRepository from "../repositories/User.repository";

class UserController {
  createUser: RequestHandler = async (req, res, next) => {
    var user: User = await UserRepository.createUser(req.body);
    return res
      .status(200)
      .json({ message: "User created successfully", data: user });
  };

  getUserById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const todos: User | null = await UserRepository.getUserById(+id);
    return res
      .status(200)
      .json({ message: "User fetched successfully", data: todos });
  };
}

export default new UserController();
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
