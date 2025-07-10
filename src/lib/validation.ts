import { z } from "zod";

// A string that can be empty, undefined, or a trimmed string
export const optionalString = z.string().trim().optional().or(z.literal(""));

// General Information Schema
export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});
// TypeScript type automatically generated from the schema
export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

// Personal Information Schema
export const personalInfoSchema = z.object({
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be a valid image file",
    )
    .refine(
      (file) => !file || (file && file.size <= 1024 * 1024 * 4),
      "File size must be less than 4MB",
    ),
});
// TypeScript type automatically generated from the schema
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

// Work Experience Schema
export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});
// TypeScript type automatically generated from the schema
export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;
export type WorkExperience = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];

// Education Schema
export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        institution: optionalString,
        fieldOfStudy: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});
// TypeScript type automatically generated from the schema
export type EducationValues = z.infer<typeof educationSchema>;

//Award Schema
export const awardSchema = z.object({
  awards: z
    .array(
      z.object({
        title: optionalString,
        issuer: optionalString,
        dateReceived: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});
// TypeScript type automatically generated from the schema
export type AwardValues = z.infer<typeof awardSchema>;

// Certificate Schema
export const certificateSchema = z.object({
  certificates: z
    .array(
      z.object({
        title: optionalString,
        issuer: optionalString,
        issueDate: optionalString,
        credentialId: optionalString,
        credentialUrl: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});
// TypeScript type automatically generated from the schema
export type CertificateValues = z.infer<typeof certificateSchema>;

// Project Schema
export const projectSchema = z.object({
  projects: z
    .array(
      z.object({
        title: optionalString,
        publicationDate: optionalString,
        publicationUrl: optionalString,
        description: optionalString,
      }),
    )
    .optional(),
});
// TypeScript type automatically generated from the schema
export type ProjectValues = z.infer<typeof projectSchema>;

// Skills Schema
export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});
// TypeScript type automatically generated from the schema
export type SkillsValues = z.infer<typeof skillsSchema>;

// Summary Schema
export const summarySchema = z.object({
  summary: optionalString,
});
// TypeScript type automatically generated from the schema
export type SummaryValues = z.infer<typeof summarySchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...awardSchema.shape,
  ...certificateSchema.shape,
  ...projectSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
});

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
});

export type GenerateWorkExperienceInput = z.infer<
  typeof generateWorkExperienceSchema
>;

export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...awardSchema.shape,
  ...certificateSchema.shape,
  ...projectSchema.shape,
  ...skillsSchema.shape,
});

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;