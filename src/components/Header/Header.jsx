import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // 1. Traemos el contexto de autenticación
import logo from '../../assets/logo_wm.png';
import '../../App.css';
import { HiOutlineBell } from "react-icons/hi2";

function Header() {
    const { logout } = useAuth(); // 3. Extraemos la función logout
    const navigate = useNavigate(); // 4. Inicializamos el navegador de rutas

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate("/login");
    };

  return (
    /* 💡 Quitamos el .app-container de aquí para que no rompa el layout del celular */
    <header className="app-header-bar">
      <div className="brand-container">
        <img src={logo} className="app-header-logo" alt="WallMéxico" />
        <h1 className="app-header-title">
          <span className="brand-wall">Wall</span>
          <span className="brand-mexico">México</span>
        </h1>
      </div>
      
      <button className="notification-btn" onClick={handleLogout}>
        <HiOutlineBell className="notification-icon" />
        <span className="notification-badge"></span>
      </button>
    </header>
  );
}

export default Header;