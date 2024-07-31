import httpStatus from "http-status";
import { z } from "zod";
import AppError from "../../../errors/AppError";
import prisma from "../../../shared/prisma";

export const createApplicantIntoDB = async (body: any) => {
  const applicantSchema = z
    .object({
      fullName: z.string().min(1, "Full name is required"),
      dateOfBirth: z
        .string()
        .min(1, "Date of birth is required")
        .refine((val) => !isNaN(Date.parse(val)), {
          message: "Invalid date format",
        }),
      nationality: z.string().min(1, "Nationality is required"),
      email: z.string().email("Invalid email address"),
      phone: z.string().min(1, "Phone number is required"),
      departureDate: z
        .string()
        .min(1, "Departure date is required")
        .refine((val) => !isNaN(Date.parse(val)), {
          message: "Invalid date format",
        }),
      returnDate: z
        .string()
        .min(1, "Return date is required")
        .refine((val) => !isNaN(Date.parse(val)), {
          message: "Invalid date format",
        }),
      accommodation: z.string().min(1, "Accommodation preference is required"),
      specialRequests: z.string().optional(),
      healthDeclaration: z.boolean(),
      emergencyContact: z.string().min(1, "Emergency contact is required"),
      medicalConditions: z.string().optional(),
    })
    .refine(
      (data) => new Date(data.returnDate) > new Date(data.departureDate),
      {
        message: "Return date must be after the departure date",
        path: ["returnDate"], // specify which field causes the error
      }
    );
  const validationResult = applicantSchema.safeParse(body);

  if (!validationResult.success) {
    // If validation fails, throw an error with the validation message
    const errorMessages = validationResult.error.errors
      .map((e) => e.message)
      .join(", ");
    throw new AppError(httpStatus.NOT_ACCEPTABLE, errorMessages);
  }
  const result = await prisma.applicant.create({
    data: body,
  });
  return result;
};

export const getAllApplicants = async () => {
  const result = await prisma.applicant.findMany();
  return result;
};
export const getApplicantFromDB = async (id: number) => {
  const result = await prisma.applicant.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
