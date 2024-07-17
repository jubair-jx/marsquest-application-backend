import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { createApplicantIntoDB } from "./applicant.services";

const createApplicant = catchAsync(async (req, res) => {
  const result = await createApplicantIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your Application has created successfully",
    data: result,
  });
});

export const ApplicationController = {
  createApplicant,
};
