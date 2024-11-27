import { z } from 'zod';
import { healthValidator } from '../validators';

export type Health = z.infer<typeof healthValidator>;
