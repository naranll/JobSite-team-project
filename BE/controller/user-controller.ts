import User from "../model/User";
import express, { Request, Response } from "express";
import { getUsers, addUser } from "../service/user-services";

const userRouter = express.Router();

userRouter.get("/users", async (req: Request, res: Response) => {
  console.log("GET users request");
  const result = await getUsers();
  try {
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

userRouter.post(".register", async (req: Request, res: Response) => {
  console.log("user Register huselt", req.body);

  const data = req.body;
});

userRouter.post("/users/add", async (req: Request, res: Response) => {
  console.log("user Post request", req.body);
  try {
    const user = req.body;
    const result = await addUser(user);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

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
