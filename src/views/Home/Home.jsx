import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../App.css';
import JobCard from './components/jobCard'; 
import { getJobsFromDB } from '../../services/jobService';
import Header from '../../components/Header/Header';
import Searchbar from '../../components/Searchbar/Searchbar';
import Navbar from '../../components/Navbar/Navbar';

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobsFromDB()
      .then((data) => {
        setJobs(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setJobs([]);
        setLoading(false);
      });
  }, []);

  // Captura lo que escribes en Home y te redirige a Search con el texto en la URL
  const handleSearchFromHome = (text) => {
    if (text.trim()) {
      navigate(`/search?q=${encodeURIComponent(text)}`);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <div className="app-container">
      <Header />
      
      {/* Mantenemos la barra pura limpia; no almacena estado local aquí */}
      <Searchbar searchTerm="" onSearchChange={handleSearchFromHome} />
      
      {/* Contenido Principal */}
      <main className="app-main-content">
        <div className="feed-container">
          {/* 💡 CORREGIDO: Contenedor con alineación flex y botón dinámico limpio */}
          <div className="recommended-section-header">
            <h3 className="section-title">Publicaciones recientes</h3>
            {jobs?.length > 3 && (
              <span className="view-all-link" onClick={() => navigate("/search")}>
                Ver más &gt;
              </span>
            )}
          </div>
          
          {loading ? (
            <p className="loading-text">Cargando publicaciones...</p>
          ) : jobs?.length === 0 ? (
            <p className="no-jobs-text">No hay publicaciones disponibles en este momento.</p>
          ) : (
            <div className="jobs-list">
              {/* Muestra estrictamente las primeras 3 publicaciones */}
              {jobs?.slice(0, 3).map((item) => (
                <JobCard key={item.id} job={item} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* El Navbar al final, encargado de la navegación */}
      <Navbar />
    </div>
  );
}

export default Home;