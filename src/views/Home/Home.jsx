import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSearch } from '../../contexts/SearchContext'; // Conexión a la antena global
import '../../App.css';
import Header from '../../components/Header/Header';
import Searchbar from '../../components/Searchbar/Searchbar';

// 💡 CORREGIDO: Ruta apuntando a los componentes globales
import FilterModal from '../../components/FilterModal/FilterModal'; 
import Card from '../../components/Card/Card';
import Navbar from '../../components/Navbar/Navbar';

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Extraemos los controles y datos de la antena global
  const { 
    jobs, 
    loading, 
    isModalOpen, 
    setIsModalOpen, 
    filters, 
    setFilters, 
    searchQuery 
  } = useSearch();

  // Redirección si el usuario escribe en la Home
  useEffect(() => {
    const hasActiveFilters = filters.location !== '' || filters.type !== '' || filters.minSalary !== '';
    if (hasActiveFilters) {
      navigate('/search');
    }
  }, [filters, navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <div className="app-container">
      <Header />
      
      <Searchbar />
      
      <main className="app-main-content">
        <div className="feed-container">
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
              {jobs?.slice(0, 3).map((item) => (
                <Card key={item.id} job={item} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Navbar />

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApplyFilters={(nuevosFiltros) => setFilters(nuevosFiltros)}
        currentFilters={filters}
      />
    </div>
  );
}

export default Home;