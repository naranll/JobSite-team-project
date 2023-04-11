import express, { Request, Response } from "express";
import User from "../model/User";

const userRouter = express.Router();

userRouter.post("/user/login", async (req: Request, res: Response) => {
  console.log("user add POST request", req.body);

  try {
    const { username, password } = req.body;

    if (!username && password) {
      res.status(400).json({
        success: false,
        status: "please fill required fields",
        updated: 1,
        username: username,
        password: password,
      });
      return;
    }
  } catch (error) {
    res.status(400).send({ error: "failed" });
  }
});
