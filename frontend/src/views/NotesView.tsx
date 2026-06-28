import React, { useEffect, useState } from 'react';
import { useNotes } from '../viewmodels/useNotes';
import { useAuth } from '../viewmodels/useAuth';

export const NotesView: React.FC = () => {
  const { myNotes, sharedNotes, loading, error, fetchNotes, uploadNote, deleteNote } = useNotes();
  const { logout } = useAuth();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && file) {
      await uploadNote(title, file);
      setTitle('');
      setFile(null);
      (document.getElementById('fileInput') as HTMLInputElement).value = '';
    }
  };

  if (loading) return <p>Cargando notas...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Mis Notas</h2>
        <button onClick={logout}>Cerrar Sesión</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>Adjuntar Nueva Nota (.txt)</h3>
        <form onSubmit={handleUpload} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Título de la nota" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <input 
            id="fileInput"
            type="file" 
            accept=".txt" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
            required 
          />
          <button type="submit">Subir Archivo</button>
        </form>
      </div>

      <h3>Lista de Notas</h3>
      {myNotes.length === 0 && <p>No tienes notas adjuntas aún.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {myNotes.map(note => (
          <li key={note.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
            <span><strong>{note.title}</strong> - <small>{new Date(note.created_at).toLocaleString()}</small></span>
            <button onClick={() => deleteNote(note.id)} style={{ color: 'red', cursor: 'pointer' }}>Eliminar</button>
          </li>
        ))}
      </ul>
      
      {/* Mapeo de notas compartidas iría aquí */}
    </div>
  );
};
