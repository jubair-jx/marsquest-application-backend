import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { userControllers } from "./user.controller";
import { userValidationSchemas } from "./user.validation";

const userRoutes = Router();

userRoutes.post(
  "/create-admin",
  auth(UserRole.SUPER_ADMIN),
  validateRequest(userValidationSchemas.createAdmin),
  userControllers.createAdmin
);

//Modifed the get all user endpoint

userRoutes.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  userControllers.getUserById
);



export default userRoutes;
