import { useState, useCallback } from 'react';
import api from '../models/api';

export interface Note {
  id: number;
  title: string;
  file_path: string;
  created_at: string;
}

export const useNotes = () => {
  const [myNotes, setMyNotes] = useState<Note[]>([]);
  const [sharedNotes, setSharedNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      setError(null);
      const res = await api.get('/notes');
      setMyNotes(res.data.myNotes);
      setSharedNotes(res.data.sharedNotes);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadNote = async (title: string, file: File) => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);
      
      await api.post('/notes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await fetchNotes(); // Refresh list
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to upload note');
      throw err;
    }
  };

  const deleteNote = async (id: number) => {
    try {
      setError(null);
      await api.delete(`/notes/${id}`);
      await fetchNotes(); // Refresh list
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete note');
      throw err;
    }
  };

  return {
    myNotes,
    sharedNotes,
    loading,
    error,
    fetchNotes,
    uploadNote,
    deleteNote
  };
};
