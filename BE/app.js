import express from "express";
import cors from "cors";
import db from "./config/mongo-config.js";
import jobRouter from "./routes/job-api.js";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use("/jobs", jobRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
