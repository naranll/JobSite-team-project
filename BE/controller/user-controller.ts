import User from "../model/User";
import express, { Request, Response } from "express";
import { getUsers, addUser, checkUser } from "../service/user-services";

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

userRouter.post("/user/register", async (req: Request, res: Response) => {
  console.log("user Register huselt", req.body);
  try {
    const data = req.body;
    const result = await addUser(data);
    console.log("result:", result);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log({ error: "Failed" });
  }
});

userRouter.post("/user/login", async (req: Request, res: Response) => {
  console.log("user login request", req.body);

  try {
    const data = req.body;
    if (data) {
      const result = await checkUser(data);
      if (result) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(400).json({
          message: "email or password wrong",
          success: false,
        });
      }
    }
  } catch (error) {
    res.status(400).send({ error: "failed" });
  }
});

export default userRouter;
