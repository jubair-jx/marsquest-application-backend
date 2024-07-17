import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { profileServices } from "./profile.services";

const getAllProfiles = catchAsync(async (req, res) => {
  const result = await profileServices.getAllProfilesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const profileControllers = {
  getAllProfiles,
};
