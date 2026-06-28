import { Request, Response } from 'express';
import { noteService } from '../services/NoteService';
import { AuthRequest } from '../middlewares/authMiddleware';

export class NoteController {
  async uploadNote(req: AuthRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded or invalid file format' });
      }
      const note = await noteService.createNote(req.body.title, req.file, req.user.id);
      res.status(201).json(note);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getMyNotes(req: AuthRequest, res: Response) {
    try {
      const notes = await noteService.getUserNotes(req.user.id);
      res.json(notes);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteNote(req: AuthRequest, res: Response) {
    try {
      const noteId = parseInt(req.params.id as string);
      await noteService.deleteNote(noteId, req.user.id, req.user.role);
      res.json({ message: 'Note deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async shareNote(req: AuthRequest, res: Response) {
    try {
      const noteId = parseInt(req.params.id as string);
      const { sharedWithUserId, permissionLevelId } = req.body;
      await noteService.shareNote(noteId, sharedWithUserId, permissionLevelId, req.user.id);
      res.json({ message: 'Note shared successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const noteController = new NoteController();
