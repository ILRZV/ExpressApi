import express from "express";
import connection from "./db/config";
import { json, urlencoded } from "body-parser";
import router from "./routes/router";
import cors from "cors";
import ErrorMiddleware from "./middlewares/ErrorHandler.middleware";

const app = express();

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));

app.use("/", router);
app.use(ErrorMiddleware);
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
