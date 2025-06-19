import { z } from "zod";

export const statsValidator = z.object({
    completed: z.number(),
    failed: z.number(),
    unattempted: z.number()
})