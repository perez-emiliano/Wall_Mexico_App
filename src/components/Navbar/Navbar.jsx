import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 💡 Importamos useLocation
import '../../App.css';
import { HiOutlineHome, HiOutlineMagnifyingGlass, HiOutlineChatBubbleLeftRight, HiOutlineUser } from "react-icons/hi2";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); // 💡 El "radar" que sabe exactamente en qué url estás

    // Función limpia de un solo paso
    const handleNavClick = (route) => {
        navigate(route);
    };

    return (
        <nav className="app-bottom-nav">
            {/* Botón Inicio */}
            <button 
                className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`}
                onClick={() => handleNavClick('/home')}
            >
                <HiOutlineHome className="nav-icon" /> 
                <span>Inicio</span>
            </button>

            {/* Botón Buscar */}
            <button 
                className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}
                onClick={() => handleNavClick('/search')}
            >
                <HiOutlineMagnifyingGlass className="nav-icon" /> 
                <span>Buscar</span>
            </button>

            {/* Botón Mensajes */}
            <button 
                className={`nav-item ${location.pathname === '/messages' ? 'active' : ''}`}
                onClick={() => handleNavClick('/messages')}
            >
                <HiOutlineChatBubbleLeftRight className="nav-icon" /> 
                <span>Mensajes</span>
            </button>

            {/* Botón Perfil */}
            <button 
                className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
                onClick={() => handleNavClick('/profile')}
            >
                <HiOutlineUser className="nav-icon" /> 
                <span>Perfil</span>
            </button>
        </nav>
    );
}

export default Navbar;