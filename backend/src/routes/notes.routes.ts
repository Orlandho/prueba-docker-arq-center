import { Router } from 'express';
import { noteController } from '../controllers/NoteController';
import { authenticateJWT, requireRole } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

// Todas las rutas de notas requieren autenticación
router.use(authenticateJWT);

router.get('/', noteController.getMyNotes);
router.post('/', upload.single('file'), noteController.uploadNote);
router.delete('/:id', noteController.deleteNote);
router.post('/:id/share', noteController.shareNote);

export default router;
