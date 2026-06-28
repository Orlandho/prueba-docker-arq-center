import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/UserRepository';
import { Role } from '../models';

class AuthService {
  async register(userData: any) {
    const existingUser = await userRepository.findByUsername(userData.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(userData.password, salt);

    // Default to User role if not provided
    let role_id = userData.role_id;
    if (!role_id) {
      const userRole = await Role.findOne({ where: { name: 'User' } });
      if (userRole) role_id = userRole.id;
    }

    const user = await userRepository.create({
      username: userData.username,
      password_hash,
      role_id
    });

    return this.generateToken(user);
  }

  async login(username: string, password: string) {
    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = {
      id: user.id,
      username: user.username,
      role_id: user.role_id,
      role: user.role ? user.role.name : null
    };

    const secret = process.env.JWT_SECRET || 'fallback_secret';
    return jwt.sign(payload, secret, { expiresIn: '1d' });
  }
}

export const authService = new AuthService();
