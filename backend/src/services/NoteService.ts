import fs from 'fs';
import path from 'path';
import { noteRepository } from '../repositories/NoteRepository';

class NoteService {
  async createNote(title: string, file: Express.Multer.File, userId: number) {
    if (!file) {
      throw new Error('File is required');
    }
    
    // El archivo ya está guardado por Multer, solo guardamos la ruta
    const file_path = path.join('uploads', file.filename);
    
    return noteRepository.create({ title, file_path }, userId);
  }

  async getUserNotes(userId: number) {
    const myNotes = await noteRepository.findAllByUserId(userId);
    const sharedNotes = await noteRepository.findSharedWithUserId(userId);
    return { myNotes, sharedNotes };
  }

  async deleteNote(noteId: number, userId: number, userRoleName: string) {
    const note = await noteRepository.findById(noteId);
    if (!note) {
      throw new Error('Note not found');
    }

    // Only owner or Admin can delete
    if (note.owner_id !== userId && userRoleName !== 'Admin') {
      throw new Error('Unauthorized to delete this note');
    }

    await noteRepository.softDelete(noteId, userId);
  }

  async shareNote(noteId: number, sharedWithUserId: number, permissionLevelId: number, currentUserId: number) {
    const note = await noteRepository.findById(noteId);
    if (!note) {
      throw new Error('Note not found');
    }

    if (note.owner_id !== currentUserId) {
      throw new Error('Only the owner can share the note');
    }

    await noteRepository.share(noteId, sharedWithUserId, permissionLevelId, currentUserId);
  }
}

export const noteService = new NoteService();
