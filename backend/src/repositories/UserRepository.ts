import { User, Role } from '../models';
import { auditLogger } from '../services/AuditLoggerService';

export class UserRepository {
  async findByUsername(username: string): Promise<User | null> {
    return User.findOne({ where: { username, is_active: true }, include: ['role'] });
  }

  async findById(id: number): Promise<User | null> {
    return User.findOne({ where: { id, is_active: true }, include: ['role'] });
  }

  async create(userData: any): Promise<User> {
    const user = await User.create(userData);
    await auditLogger.log('CREATE', 'User', user.id, null, { username: user.username });
    return user;
  }
}

export const userRepository = new UserRepository();
