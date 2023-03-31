import express from "express";
import { getJobsList } from "../service/job-services.js";

const jobRouter = express.Router();

jobRouter.get("/", async (req, res) => {
  console.log("jobs GET request");
  const result = await getJobsList();

  try {
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: "not found" });
  }
});

jobRouter.post("/add", async (req, res) => {
  console.log("job POST request", req.body);
});

export default jobRouter;
