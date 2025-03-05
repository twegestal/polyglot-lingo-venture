import { Request, Response, NextFunction } from 'express';
import { supabase } from '../utils/supabase';
import { logger } from '../utils/logger';

export const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      logger.warn('Unauthorized request - Missing token');
      return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      logger.warn('Unauthorized request - Invalid token');
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    req.user = data.user;

    logger.info(`Authenticated user: ${data.user.email}`);
    next();
  } catch (error) {
    logger.error(`Auth error: ${error}`);
    res.status(500).json({ message: 'Internal authentication error' });
  }
};
