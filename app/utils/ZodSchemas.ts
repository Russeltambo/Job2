import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(2, "Company must be atleast 2 characters"),
  location: z.string().min(1, "Location must defined"),
  about: z
    .string()
    .min(10, "Please provide some information about your company"),
  logo: z.string().min(1, "Please upload a logo"),
  website: z.string().url("Please enter a valid URL"),
  xAccount: z.string().optional(),
});