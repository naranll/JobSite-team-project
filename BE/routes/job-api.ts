import express, { Request, Response } from "express";
// import { addJobsList } from "../service/job-services.js";
import Job from "../model/Job.js";

const jobRouter = express.Router();

jobRouter.post("/addjob", async (req: Request, res: Response) => {
  console.log("jobs POST request", req.body);

  try {
    const jobs = new Job(req.body);
    const result = await jobs.save();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).send({ error: "not found" });
  }
});

jobRouter.get("/jobs", async (req: Request, res: Response) => {
  console.log("job GET request");

  try {
    const result = await Job.find({});
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

jobRouter.get("/jobs/job_id", async (req: Request, res: Response) => {
  console.log("generating path");
  try {
    const query = await Job.find({}).select({ _id: 1 });
    return res.status(200).send(query);
  } catch (error) {
    console.log(error);
  }
});

jobRouter.get("/jobs/:id", async (req: Request, res: Response) => {
  console.log("id request", req.params.id);

  try {
    const result = await Job.findOne({ _id: req.params.id });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

export default jobRouter;