import logo from '../../assets/logo_wm.png';
import '../../App.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); // Hook para redirigir al home(dashboard) después del registro

    const HandleRegister = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        //Logica para el backend de registro de usuario, por ahora solo mostramos en consola
        console.log('Registro intent:', { name, email, password });
        navigate('/home'); // Redirigir al home después del registro exitoso
    };

    return (
        <div className="register-container">
            <div className="register-card">
                {/*Encabezado*/}
                <header className="register-header">
                    <img src={logo} className="register-logo" alt="WallMexico Logo"/>
                    <h1 className="register-title">Únete a WallMexico</h1>
                    <p className="register-subtitle">Crea tu cuenta en pocos pasos</p>
                </header>

                {/*Fromulario de Registro*/}
                <form onSubmit={HandleRegister} className="register-form">
                    <div className="input-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Nombre completo o nombre de tu negocio"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Correo Electronico</label>
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
                        <label htmlFor="name">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Minimo 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Confirme Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Repite tu contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{marginTop: '10px'}}>
                        Registrarse
                    </button>
                </form>

                {/*Footer*/}
                <footer>
                    <p>¿Ya tienes una cuenta?<Link to="/login" className="login-link"> Inicia sesión</Link></p>
                </footer>

            </div>
        </div>
    );
}

export default Register;