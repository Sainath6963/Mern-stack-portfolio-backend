import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middleware/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRoutes.js";
import timelineRouter from "./router/timelineRouter.js";
import softwareApplicationRoutes from "./router/softwareApplicationRoutes.js";
import skillRoute from "./router/skillRoute.js";
import projecRoute from "./router/projectRouter.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBORD_URL],
    methods: ["GET ", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwareApplications", softwareApplicationRoutes);
app.use("/api/v1/Skill", skillRoute);
app.use("/api/v1/projects", projecRoute);

dbConnection();
app.use(errorMiddleware);

export default app;
