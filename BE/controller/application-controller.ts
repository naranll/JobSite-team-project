import express, { Request, Response } from "express";
import Application from "../model/Application";
import { addApplication } from "../service/application-service";
import { ApplicationType } from "../util/types";

const applicationRouter = express.Router();

applicationRouter.post(
  "/application/add",
  async (req: Request, res: Response) => {
    console.log("new Application POST request", req.body);

    try {
      const newApplication: ApplicationType = {
        job: req.body.job,
        applicant: req.body.user,
        state: "active",
      };
      const result = await addApplication(newApplication);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export default applicationRouter;
