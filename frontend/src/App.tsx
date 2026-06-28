import React from 'react';
import { useAuth } from './viewmodels/useAuth';
import { LoginView } from './views/LoginView';
import { NotesView } from './views/NotesView';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: 20 }}>Verificando sesión...</div>;
  }

  return (
    <>
      {!isAuthenticated ? <LoginView /> : <NotesView />}
    </>
  );
}

export default App;
