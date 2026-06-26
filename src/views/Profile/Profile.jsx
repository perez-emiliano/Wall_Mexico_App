import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../App.css';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';

function Profile() {
    const { logout } = useAuth(); // 3. Extraemos la función logout
    const navigate = useNavigate(); // 4. Inicializamos el navegador de rutas

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate("/login");
    };

  return (
    <div className="app-container">
        <Header />
            <header className="app-header-bar">
                <h1 className="app-header-title">Perfil</h1>
            </header>
            
            <main className="app-main-content">
                <p>Aquí se mostrarán tus datos de perfil.</p>
            </main>
        <Navbar />
    </div>
  );
}

// 💡 ¡ESTA ES LA LÍNEA QUE FALTA! Añádela al final:
export default Profile;