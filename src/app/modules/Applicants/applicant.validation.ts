import { z } from "zod";

const applicantSchema = z.object({
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
});

export const applicantValidationSchemas = {
  applicantSchema,
};
