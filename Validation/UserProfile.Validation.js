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

  projects: z
    .array(
      z.object({
        title: z.string().trim().min(1),
        domain: z.string().trim().min(1),
        techStack: z.array(z.string().trim()).optional().default([]),
      })
    )
    .optional()
    .default([]),
});

export default UserInputVali;
