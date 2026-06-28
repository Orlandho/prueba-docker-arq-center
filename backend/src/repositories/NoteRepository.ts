import { Note, User, NoteShare } from '../models';
import { auditLogger } from '../services/AuditLoggerService';

export class NoteRepository {
  async findAllByUserId(userId: number): Promise<Note[]> {
    return Note.findAll({
      where: { owner_id: userId, is_active: true },
    });
  }

  async findSharedWithUserId(userId: number): Promise<Note[]> {
    const sharedNotes = await Note.findAll({
      include: [
        {
          model: User,
          as: 'shared_users',
          where: { id: userId },
          through: { where: { is_active: true } }
        }
      ],
      where: { is_active: true }
    });
    return sharedNotes;
  }

  async findById(id: number): Promise<Note | null> {
    return Note.findOne({ where: { id, is_active: true } });
  }

  async create(noteData: any, userId: number): Promise<Note> {
    const note = await Note.create({ ...noteData, owner_id: userId });
    await auditLogger.log('CREATE', 'Note', note.id, userId, { title: note.title });
    return note;
  }

  async softDelete(id: number, userId: number): Promise<void> {
    const note = await Note.findOne({ where: { id, is_active: true } });
    if (note) {
      note.is_active = false;
      await note.save();
      await auditLogger.log('DELETE', 'Note', note.id, userId, { method: 'soft_delete' });
    }
  }

  async share(noteId: number, sharedWithUserId: number, permissionLevelId: number, currentUserId: number): Promise<void> {
    await NoteShare.create({
      note_id: noteId,
      shared_with_user_id: sharedWithUserId,
      permission_level_id: permissionLevelId,
    });
    await auditLogger.log('SHARE', 'Note', noteId, currentUserId, { shared_with: sharedWithUserId, permission: permissionLevelId });
  }
}

export const noteRepository = new NoteRepository();
