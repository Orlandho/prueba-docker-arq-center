import { Request, Response } from 'express';
import { authService } from '../services/AuthService';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const token = await authService.register(req.body);
      res.status(201).json({ token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await authService.login(username, password);
      res.json({ token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();
