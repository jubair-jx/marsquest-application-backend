import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { profileControllers } from "./profile.controller";

const profileRoutes = Router();

profileRoutes.get("/", auth(UserRole.ADMIN), profileControllers.getAllProfiles);

export default profileRoutes;
