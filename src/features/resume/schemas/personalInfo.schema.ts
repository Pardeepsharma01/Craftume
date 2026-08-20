import { z } from "zod";

const optionalUrl = z
  .string()
  .optional()
  .or(z.literal(""))
  .refine(
    (val) => {
      if (!val || val.trim() === "") return true;
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Please enter a valid URL (e.g. https://linkedin.com/in/username)" }
  );

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  linkedin: optionalUrl,
  github: optionalUrl,
  portfolio: optionalUrl,
  website: optionalUrl,
});

export type PersonalInfoSchemaType = z.infer<typeof personalInfoSchema>;
