import express, { Express } from "express";
import cors from "cors";
import jobRouter from "./controller/job-controller";
import userRouter from "./controller/user-controller";

const app: Express = express();
const port = 8090;
app.use(cors());
app.use(express.json());

app.use(jobRouter);
app.use(userRouter);


app.listen(port, () => {
    console.log(`[server] Dashboard server running at ${port}`);
})
