import { Router } from "express";
import adminRoutes from "../app/modules/Admin/admin.router";
import applicantRoutes from "../app/modules/Applicants/applicant.route";
import profileRoutes from "../app/modules/Profile/profile.route";
import authRoutes from "../app/modules/auth/auth.route";
import userRoutes from "../app/modules/users/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/applicant",
    route: applicantRoutes,
  },

  {
    path: "/profile",
    route: profileRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
