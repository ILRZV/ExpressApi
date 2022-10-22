import { Router } from "express";
import UserRouter from "./User.router";

const router = Router();

router.use("/users", UserRouter);

export default router;
