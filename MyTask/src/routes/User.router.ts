import { Router } from "express";

import UserController from "../controllers/Users.controller";

const UserRouter = Router();

UserRouter.post("/", UserController.createUser);

// UserRouter.get("/", getAllUsers);

UserRouter.get("/:id", UserController.getUserById);

// router.put("/:id", updateTodo);

// router.delete("/:id", deleteToDo);

export default UserRouter;
