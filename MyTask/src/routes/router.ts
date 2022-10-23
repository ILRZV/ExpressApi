import { Router } from "express";
import AuthRouter from "./Auth.router";
import FileRouter from "./File.router";

const router = Router();

router.use("/file", FileRouter);
router.use("/", AuthRouter);

export default router;
