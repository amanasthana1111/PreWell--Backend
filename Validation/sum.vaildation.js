import z from "zod";

export const sumVerify = z.object({
    firstNo : z.number().min(1).max(100),
    secondNo : z.number().min(1).max(100),
    sum:z.number().min(1).max(201),
    planAmount: z.enum(["10", "20", "30"]),
})