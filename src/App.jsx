import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Home from './views/Home/Home';
import Search from './views/Search/Search';
import Messages from './views/Messages/Messages';
import Profile from './views/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* 1. Redirección inicial y rutas públicas */}
              <Route path="/" element={<Navigate to="/home" replace/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* 2. Rutas Protegidas de la aplicación (Todas envueltas) */}
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              
              {/* 3. 🚨 SIEMPRE AL FINAL: Atrapa cualquier ruta desconocida y manda a login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;