import { dbInstance } from '../config/database';
import { Role } from './Role';
import { User } from './User';
import { Note } from './Note';
import { PermissionLevel } from './PermissionLevel';
import { NoteShare } from './NoteShare';
import { AuditLog } from './AuditLog';

export const syncDatabase = async () => {
  try {
    await dbInstance.authenticate();
    console.log('Connection to SQL Express has been established successfully.');
    
    // Sync models
    await dbInstance.sync();
    console.log('Database synced successfully.');
    
    // Seed default catalogs if empty
    const adminRole = await Role.findOrCreate({ where: { name: 'Admin' }, defaults: { description: 'Administrator role' } });
    const userRole = await Role.findOrCreate({ where: { name: 'User' }, defaults: { description: 'Standard user role' } });
    
    await PermissionLevel.findOrCreate({ where: { name: 'Read' } });
    await PermissionLevel.findOrCreate({ where: { name: 'Edit' } });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export {
  dbInstance,
  Role,
  User,
  Note,
  PermissionLevel,
  NoteShare,
  AuditLog
};
