import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userControllers } from "./user.controller";
import { userValidationSchemas } from "./user.validation";

const userRoutes = Router();

userRoutes.post(
  "/create-admin",
  validateRequest(userValidationSchemas.createAdmin),
  userControllers.createAdmin
);

//Modifed the get all user endpoint

userRoutes.get("/:id", userControllers.getUserById);

export default userRoutes;
