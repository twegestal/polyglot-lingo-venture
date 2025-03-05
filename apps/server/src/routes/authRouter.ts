import express, { Request, Response, NextFunction } from 'express';
import { supabase } from '../utils/supabase';
import { logger } from '../utils/logger';

export const authRouter = () => {
  const router = express.Router();

  router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        logger.warn(`Signup failed for ${email}: ${error.message}`);
        throw new Error(error.message);
      }

      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        throw new Error('Signup successful, but auto-login failed. Please log in manually.');
      }

      logger.info(`User signed up & logged in: ${data.user?.id}`);

      return res.status(201).json({
        message: 'Signup successful.',
        token: loginData.session?.access_token,
        user: loginData.user,
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        logger.warn(`Login failed for ${email}: ${error.message}`);
        throw new Error('Invalid email or password');
      }

      logger.info(`User logged in: ${data.user?.id}`);

      return res.status(200).json({
        token: data.session?.access_token,
        user: data.user,
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
