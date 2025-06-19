import { z } from "zod";
import { statsValidator } from "../validators";

export type Stats = z.infer<typeof statsValidator>;