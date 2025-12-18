import { z } from "zod";
const UserLoginInputValidation = z.object({
  email: z.string().trim().email("Invalid email address"),

  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(15, "Password must be at most 15 characters"),
});

export default UserLoginInputValidation;
