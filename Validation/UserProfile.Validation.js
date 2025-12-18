import z from "zod";
const UserInputVali = z.object({
      fullName: z
        .string()
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Full name must be at most 50 characters")
        .trim(),

      summary: z
        .string()
        .trim()
        .min(10, "Summary must be at least 10 characters")
        .max(300)
        .optional()
        .default(""),

      skills: z
        .array(
          z.object({
            name: z.string().trim().min(1),
            category: z.string().trim().min(1),
            proficiency: z.number().min(1).max(10).nullable(),
          })
        )
        .optional()
        .default([]),

      education: z
        .array(
          z.object({
            degree: z.string().trim().min(1),
            fieldOfStudy: z.string().trim().min(1),
            institution: z.string().trim().min(1),
            startYear: z.number().int().nullable(),
            endYear: z.number().int().nullable(),
            score: z.string().trim().optional().default(""),
          })
        )
        .optional()
        .default([]),

      experience: z
        .array(
          z.object({
            companyName: z.string().trim().min(1),
            role: z.string().trim().min(1),
            employmentType: z.string().trim().min(1),
            techStack: z.array(z.string().trim()).optional().default([]),
            startDate: z.coerce.date().nullable(),
            endDate: z.coerce.date().nullable(),
          })
        )
        .optional()
        .default([]),

      projects: z
        .array(
          z.object({
            title: z.string().trim().min(1),
            domain: z.string().trim().min(1),
            techStack: z.array(z.string().trim()).optional().default([]),
            description: z.string().trim().min(5),
            githubUrl: z.string().url().optional().default(""),
          })
        )
        .optional()
        .default([]),

      contactInfo: z
        .object({
          email: z.string().email().optional().default(""),
          phone: z.string().optional().default(""),
          linkedin: z.string().url().optional().default(""),
          github: z.string().url().optional().default(""),
        })
        .default({
          email: "",
          phone: "",
          linkedin: "",
          github: "",
        })
        .optional(),
    });


 export default UserInputVali;   