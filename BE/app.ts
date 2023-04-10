import express, { Express, Request, Response } from "express";
import cors from "cors";
import "./config/mongo-config";
import jobRouter from "./routes/job-api";

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(jobRouter);

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
