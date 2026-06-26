import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // 💡 Importado para leer parámetros de URL
import '../../App.css';
import './Search.css'; 
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Searchbar from '../../components/Searchbar/Searchbar';
import JobCard from '../Home/components/jobCard'; 
import { getJobsFromDB } from '../../services/jobService';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // 💡 Lee la variable "?q=" directamente desde la barra de direcciones
  const queryFromUrl = searchParams.get('q') || '';

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(queryFromUrl);
  const [loading, setLoading] = useState(true);

  // Sincronizar el input si el parámetro cambia en la URL
  useEffect(() => {
    setSearchTerm(queryFromUrl);
  }, [queryFromUrl]);

  // Pedir datos y filtrar inicialmente si ya venía texto del Home
  useEffect(() => {
    getJobsFromDB()
      .then((data) => {
        const initialJobs = data || [];
        setJobs(initialJobs);
        
        if (queryFromUrl.trim()) {
          const filtered = initialJobs.filter(job => 
            job.title?.toLowerCase().includes(queryFromUrl.toLowerCase()) ||
            job.company?.toLowerCase().includes(queryFromUrl.toLowerCase()) ||
            job.location?.toLowerCase().includes(queryFromUrl.toLowerCase())
          );
          setFilteredJobs(filtered);
        } else {
          setFilteredJobs(initialJobs);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [queryFromUrl]);

  // Controlar el filtrado desde el padre en tiempo real
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    
    // 💡 Actualiza la URL sobre la marcha: si escribe pone ?q=..., si borra la limpia
    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }

    if (!value.trim()) {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job => 
        job.title?.toLowerCase().includes(value.toLowerCase()) ||
        job.company?.toLowerCase().includes(value.toLowerCase()) ||
        job.location?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  const isSearching = searchTerm.trim() !== '';

  return (
    <div className="app-container">
      <Header />
      
      {/* Pasamos el estado y manejador como props al componente hijo */}
      <Searchbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <main className="app-main-content searchbar-layout-fix">
        {/* TÍTULO DINÁMICO */}
        <div className="recommended-section-header">
          <h3>{!isSearching ? 'Recommended Jobs' : 'Search Results'}</h3>
          {!isSearching && <span className="view-all-link">View all &gt;</span>}
        </div>

        {/* LISTA INTELIGENTE CONDICIONAL */}
        <div className="searchbar-results-list">
          {loading ? (
            <p className="loading-text">Cargando...</p>
          ) : !isSearching ? (
            /* 1️⃣ MODO RECOMENDADOS (Input vacío): Solo muestra las primeras 3 */
            jobs.map((item) => (
              <JobCard key={item.id} job={item} />
            ))
          ) : filteredJobs.length === 0 ? (
            /* 2️⃣ MODO SIN RESULTADOS */
            <p className="no-jobs-text">No se encontraron empleos que coincidan con "{searchTerm}".</p>
          ) : (
            /* 3️⃣ MODO RESULTADOS REALES DE BÚSQUEDA */
            filteredJobs.map((item) => (
              <JobCard key={item.id} job={item} />
            ))
          )}
        </div>
      </main>

      <Navbar />
    </div>
  );
}

export default Search;