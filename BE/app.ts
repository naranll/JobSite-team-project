import express, { Express, Request, Response } from "express";
import cors from "cors";
import "./config/mongo-config";
import jobRouter from "./controller/job-controller";
import userRouter from "./controller/user-controller";
import applicationRouter from "./controller/application-controller";

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(jobRouter);
app.use(userRouter);
app.use(applicationRouter);

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
