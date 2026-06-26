import React from 'react';
import '../../App.css';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';

function Messages() {
  return (
    <div className="app-container">
        <Header />
        <header className="app-header-bar">
            <h1 className="app-header-title">Mensajes</h1>
        </header>
      
        <main className="app-main-content">
            <p>Aquí se mostrarán tus conversaciones.</p>
        </main>

        <Navbar />
    </div>
  );
}

// 💡 ¡ESTA ES LA LÍNEA QUE FALTA! Añádela al final:
export default Messages;