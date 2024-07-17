import { Router } from "express";
import { authControllers } from "./auth.controller";

const authRoutes = Router();

authRoutes.post("/login", authControllers.loginUser);
authRoutes.post("/refresh-token", authControllers.refreshToken);

export default authRoutes;
