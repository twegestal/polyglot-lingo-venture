import { User } from '@supabase/supabase-js';
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
