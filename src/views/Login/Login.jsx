import logo from '../../assets/logo_wm.png';
import '../../App.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Importamos el hook de autenticación

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // Hook para redirigir al home(dashboard)después del login

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = login(email, password);

    if (result.success) {
      navigate('/home'); // Redirigir al home después del login exitoso
    } else {
      alert ("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
    console.log('Login intent:', { email, password });

  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Encabezado con tu Logo */}
        <header className="login-header">
          <img src={logo} className="login-logo" alt="WallMexico Logo" />
          <h1 className="login-title">WallMexico</h1>
          <p className="login-subtitle">Impulsando tu negocio</p>
        </header>

        {/* Formulario de Login */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              placeholder="ejemplo@correo.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="form-actions">
            <a href="#forgot" className="forgot-password">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="btn-primary">
            Iniciar Sesión
          </button>
        </form>

        {/* Registro / Footer */}
        <footer className="login-footer">
          <p>¿No tienes una cuenta? <Link to="/register" className="register-link">Regístrate</Link></p>
        </footer>

      </div>
    </div>
  );
}

export default Login;