import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo_wm.png';
import '../App.css';

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Hook para redirigir al login al hacer logout

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login"); // Redirigir al login después del logout
  }

  return (
    <div className="app-container">
      
      {/* Header superior de la App */}
      <header className="app-header-bar">
        <img src={logo} className="app-header-logo" alt="WallMexico" />
        <span className="app-header-title">WallMexico</span>
        <button className="logout-btn" onClick={handleLogout}>
          Salir
        </button>
      </header>

      {/* Contenido Principal Movible */}
      <main className="app-main-content">
        <div className="welcome-section">
          <h2>¡Hola de nuevo {user ? user.name : 'Usuario'}!</h2>
          <p>Descubre oportunidades e impulsa tu negocio hoy.</p>
        </div>

        {/* Sección de Feed/Tarjetas */}
        <div className="feed-container">
          <h3 className="section-title">Publicaciones recientes</h3>
        </div>
      </main>

      {/* Barra de navegación inferior (Estilo App Móvil) */}
      <nav className="app-bottom-nav">
        <button className="nav-item active">🏠 <span>Inicio</span></button>
        <button className="nav-item">🔍 <span>Buscar</span></button>
        <button className="nav-item">➕ <span>Publicar</span></button>
        <button className="nav-item">👤 <span>Perfil</span></button>
      </nav>

    </div>
  );
}

export default Home;