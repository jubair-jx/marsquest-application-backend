import { UserRole } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ApplicationController } from "./applicant.controller";
import { applicantValidationSchemas } from "./applicant.validation";

const applicantRoutes = Router();

applicantRoutes.post(
  "/create-applicant",
  validateRequest(applicantValidationSchemas.applicantSchema),
  ApplicationController.createApplicant
);
applicantRoutes.get(
  "/",
  auth(UserRole.ADMIN),
  ApplicationController.getApplicants
);
applicantRoutes.get(
  "/:id",
  auth(UserRole.ADMIN),
  ApplicationController.getApplicant
);

export default applicantRoutes;
