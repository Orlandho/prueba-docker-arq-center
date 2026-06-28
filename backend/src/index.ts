import express from 'express';
import cors from 'cors';
import path from 'path';
import { syncDatabase } from './models';
import authRoutes from './routes/auth.routes';
import notesRoutes from './routes/notes.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Notes App Backend is running' });
});

// Start Server & Sync DB
const startServer = async () => {
  try {
    // Retry logic for DB connection when starting via docker-compose
    const retryCount = 5;
    for (let i = 0; i < retryCount; i++) {
      try {
        await syncDatabase();
        break;
      } catch (err) {
        console.log(`DB connection failed, retrying in 5 seconds... (${i+1}/${retryCount})`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
