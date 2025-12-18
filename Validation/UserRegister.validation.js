import { z } from "zod";
const UserInputValidation = z.object({
      username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(15, "Username must be at most 15 characters"),

      email: z.string().trim().email("Invalid email address"),

      password: z
        .string()
        .min(4, "Password must be at least 4 characters")
        .max(15, "Password must be at most 15 characters"),
    });


export default UserInputValidation ;   