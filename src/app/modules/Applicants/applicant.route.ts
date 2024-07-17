import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { ApplicationController } from "./applicant.controller";

const applicantRoutes = Router();

applicantRoutes.post(
  "/create-applicant",
  ApplicationController.createApplicant
);
applicantRoutes.get(
  "/",
  auth(UserRole.ADMIN),
  ApplicationController.createApplicant
);

export default applicantRoutes;
