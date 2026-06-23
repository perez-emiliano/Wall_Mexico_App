import React, { createContext, useState, useContext, useEffect } from 'react';

// Creamos el contexto
const AuthContext = createContext(null);

// Proveedor del contexto que envolverá a toda la app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simular verificar si había una sesión guardada al abrir la app
  useEffect(() => {
    const savedUser = localStorage.getItem('wm_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Función para Iniciar Sesión
  const login = (email, password) => {
    // Aquí irá tu llamada a la API en el futuro. Por ahora simulamos éxito:
    const mockUser = { email, name: email.split('@')[0], token: "fake-jwt-token-123" };
    
    setUser(mockUser);
    localStorage.setItem('wm_user', JSON.stringify(mockUser)); // Guarda la sesión
    return { success: true };
  };

  // Función para Cerrar Sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('wm_user');
  };

  const value = { user, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar la autenticación fácilmente en cualquier archivo
export function useAuth() {
  return useContext(AuthContext);
}