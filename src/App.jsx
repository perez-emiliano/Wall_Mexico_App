import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* La ruta raíz "/" cargará el Login por defecto */}
            <Route path="/login" element={<Login />} />
            
            {/* La ruta "/register" cargará la pantalla de registro */}
            <Route path="/register" element={<Register />} />

            {/* La ruta "/register" cargará la pantalla de registro */}
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;