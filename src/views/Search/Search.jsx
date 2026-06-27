import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../../App.css';
import './Search.css'; 
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Searchbar from '../../components/Searchbar/Searchbar';
import Card from '../../components/Card/Card'; 
import FilterModal from '../../components/FilterModal/FilterModal'; // 💡 1. Añadida la importación global
import { useSearch } from '../../contexts/SearchContext';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // 💡 2. Agregamos las propiedades faltantes del modal en el destructuring
  const { 
    searchQuery, 
    setSearchQuery, 
    filteredJobs, 
    jobs, 
    loading,
    isModalOpen,    // <- Añadido
    setIsModalOpen, // <- Añadido
    filters,        // <- Añadido
    setFilters      // <- Añadido
  } = useSearch();

  // 1. Sincronizar URL inicial con el contexto
  useEffect(() => {
    const queryFromUrl = searchParams.get('q') || '';
    if (queryFromUrl !== searchQuery) {
      setSearchQuery(queryFromUrl);
    }
  }, [searchParams]);

  // 2. Sincronizar cambios de escritura del contexto hacia la URL
  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  useEffect(() => {
  // Esta parte se ejecuta cuando entras a Search (no hace nada)
  return () => {
    // 🔥 Esta función se ejecuta ÚNICAMENTE cuando el usuario ABANDONA la pantalla de Search
    setSearchQuery(''); // Limpia la barra de búsqueda global
    setFilters({        // Resetea los filtros del modal a su estado original
      location: '',
      type: '',
      minSalary: ''
    });
  };
}, [setSearchQuery, setFilters]); // Se ejecuta al desmontar el componente

  // Modificado para que detecte que estás buscando si hay texto O si hay filtros activos en el modal
  const isSearching = searchQuery.trim() !== '' || 
                      filters.location !== '' || 
                      filters.type !== '' || 
                      filters.minSalary !== '';

  return (
    <div className="app-container">
      <Header />
      
      <Searchbar />

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
            /* 1️⃣ MODO RECOMENDADOS */
            jobs.map((item) => (
              <Card key={item.id} job={item} />
            ))
          ) : filteredJobs.length === 0 ? (
            /* 2️⃣ MODO SIN RESULTADOS */
            <p className="no-jobs-text">No se encontraron empleos que coincidan con tu búsqueda. 🔍</p>
          ) : (
            /* 3️⃣ MODO RESULTADOS REALES DE BÚSQUEDA COMBINADA */
            filteredJobs.map((item) => (
              <Card key={item.id} job={item} />
            ))
          )}
        </div>
      </main>

      <Navbar />

      {/* 💡 3. Insertamos el modal al final para que funcione el botón en esta vista */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApplyFilters={(nuevosFiltros) => setFilters(nuevosFiltros)}
        currentFilters={filters}
      />
    </div>
  );
}

export default Search;