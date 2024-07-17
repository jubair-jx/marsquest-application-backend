import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandelar from "./app/middlewares/globalError";
import notFoundRoute from "./app/middlewares/notFound";
import router from "./routes/routes";

const app: Application = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(cookieParser());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Mars App Server is running now" });
});

// Main API endpoint
app.use("/api", router);

// Global error handler
app.use(globalErrorHandelar);

// Not found routes
app.use(notFoundRoute);

export default app;
